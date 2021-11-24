import { Button, Col, Drawer, Form, Input, Modal, PaginationProps, Row, Select, Switch, Table, message } from "antd";
import { IBusinessMultiTenantConntionstringDto, MultiTenantConntionstringInputDto } from "@/core/domain/system/multitenant/multitenant-entity";
import { initPaginationConfig, tacitPagingProps } from "@/shared/ajax/request";
import { useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";

import { IMultitenantService } from "@/core/domain/system/multitenant/imultitenant-service";
import { IOperationConfig } from "../../../shared/operation/operationConfig";
import { IocTypes } from "../../..//shared/config/ioc-types";
import MultitenantConntionstringOperation from "./multitenant-conntionstring-operation";
import { OperationTypeEnum } from "../../..//shared/operation/operationType";
import useHookProvider from "../../..//shared/customHooks/ioc-hook-provider";

interface IProp {
    /**
     * 操作成功回调事件
     */
    onCallbackEvent?: any;
    /**
     * 租户Id
     */
    tenantId: string;
}
/**
 * 租户数据库连接字符串列表
 * @param props 
 * @returns 
 */
const MultitenantConntionstringPage = (props: IProp) => {
    const _multitenantservice: IMultitenantService = useHookProvider(IocTypes.MultitenantService);
    const [operationState, setOperationState] = useState<IOperationConfig>({ visible: false })
    const [tableData, setTableData] = useState<Array<IBusinessMultiTenantConntionstringDto>>([]);
    const [paginationConfig, setPaginationConfig] = useState<initPaginationConfig>(new initPaginationConfig());
    const [subMultitenantConntionstringOperationElement, setMultitenantConntionstringOperationElement] = useState<any>(null);
    const columns = [
        {
            title: "服务名称",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "字符串",
            dataIndex: "value",
            key: "value",
        },
        {
            title: "操作",
            dataIndex: "id",
            key: "id",
            render: (text: any, record: IBusinessMultiTenantConntionstringDto) => {
                return (
                    <div>
                        <Button type="primary" onClick={() => editRow(record.id)}>编辑</Button>
                        <Button type="primary" danger onClick={() => deleteRow(record.id)}>删除</Button>
                    </div>
                )
            }
        }
    ];
    /**
     * 页面初始化事件
     */
    useEffect(() => {
        getTable(paginationConfig.current, paginationConfig.pageSize)
    }, [paginationConfig]);
    /**
     * 修改
     * @param _id 
     */
    const editRow = (_id: any) => {
        setMultitenantConntionstringOperationElement(<MultitenantConntionstringOperation operationType={OperationTypeEnum.edit} id={_id} onCallbackEvent={getTable} tenantId={props.tenantId} />)
    }
    const deleteRow = (_id: string) => {
        _multitenantservice.deleteConntionstring(props.tenantId, _id).then(res => {
            if (res.success) {
                message.success(res.message, 3)
                getTable(paginationConfig.current, paginationConfig.pageSize)
            }else {
                message.error(res.message, 3)
            }
        })
    };

    const pagination: PaginationProps = {
        ...tacitPagingProps,
        total: paginationConfig.total,
        current: paginationConfig.current,
        pageSize: paginationConfig.pageSize,
        onShowSizeChange: (current: number, pageSize: number) => {
            setPaginationConfig((Pagination) => {
                Pagination.current = current;
                if (pageSize) {
                    Pagination.pageSize = pageSize;
                }
                return Pagination;
            });
        },
        onChange: (page: number, pageSize?: number) => {
        }
    };
    /**
     * 页面初始化获取数据
     */
    const getTable = (page: number, pageSize?: number) => {
        setMultitenantConntionstringOperationElement(null)
        var param = {
            pageIndex: page,
            pageRow: pageSize,
        }
        _multitenantservice.getpageConntionstring(props.tenantId, param).then((x) => {
            if (x.success) {
                setPaginationConfig((Pagination) => {
                    Pagination.total = x.total;
                    return Pagination;
                });
                x.data.map((item: any, index: number) => {
                    item.key = item.id;
                    return item;
                });
                setTableData(x.data);
                if (!operationState.visible) {
                    editOperationState(true, "查看连接列表")
                }

            }
        });

    };
    /**
     * 添加服务链接字符串
     * @param _id 
     */
    const add = () => {
        setMultitenantConntionstringOperationElement(<MultitenantConntionstringOperation operationType={OperationTypeEnum.add} onCallbackEvent={getTable} tenantId={props.tenantId} />)
    };
    /**
     * 修改弹框属性
     * @param _visible 
     * @param _title 
     */
    const editOperationState = (_visible: boolean, _title?: string) => {
        setOperationState({ visible: _visible, title: _title });
    }
    /**
     * 弹框取消事件
     */
    const onCancel = () => {
        editOperationState(false)
        props.onCallbackEvent && props.onCallbackEvent();
    };
    return (
        <div>
            <Drawer title={operationState.title} closable={false} maskClosable={false} width={1380}
                placement="right" onClose={onCancel} visible={operationState.visible}>
                <Row>
                    <Col span="24" style={{ textAlign: 'right' }}>
                        <Button type="primary" onClick={() => add()}>添加数据库链接</Button>
                        <Button style={{ margin: '0 8px' }} onClick={() => onCancel()}>关闭</Button>
                    </Col>
                </Row>
                <Table bordered columns={columns} dataSource={tableData} pagination={pagination} />
                {subMultitenantConntionstringOperationElement}
            </Drawer>
        </div>
    )
};
export default MultitenantConntionstringPage;