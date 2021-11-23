import { Button, Col, Drawer, Form, Input, Modal, PaginationProps, Row, Select, Switch, Table, message } from "antd";
import { IBusinessMultiTenantConntionstringDto, MultiTenantConntionstringInputDto } from "@/core/domain/system/multitenant/multitenant-entity";
import { initPaginationConfig, tacitPagingProps } from "@/shared/ajax/request";
import { useEffect, useImperativeHandle, useState } from "react";

import { IMultitenantService } from "@/core/domain/system/multitenant/imultitenant-service";
import { IOperationConfig } from "../../../shared/operation/operationConfig";
import { IocTypes } from "../../..//shared/config/ioc-types";
import { OperationTypeEnum } from "../../..//shared/operation/operationType";
import useHookProvider from "../../..//shared/customHooks/ioc-hook-provider";

interface IProp {
    /**
     * 
     */
    operationRef?: any;
    /**
     * 操作成功回调事件
     */
    onCallbackEvent?: any;
}
/**
 * form表单布局设置
 */
const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 },
};
/**
 * 日期框格式
 */
const validateMessages = {
    required: "${label} 不可为空!",
    types: {
        email: "${label} 格式不符合要求!",
        number: "${label} is not a valid number!",
    },
    number: {
        range: "${label} must be between ${min} and ${max}",
    },
};
/**
 * 租户数据库连接字符串列表
 * @param props 
 * @returns 
 */
const MultitenantConntionstringPage = (props: IProp) => {
    const _multitenantservice: IMultitenantService = useHookProvider(IocTypes.MultitenantService);
    const [operationState, setOperationState] = useState<IOperationConfig>({ visible: false })
    const [initformData, setinitformData] = useState<MultiTenantConntionstringInputDto>(new MultiTenantConntionstringInputDto());
    const [tableData, setTableData] = useState<Array<IBusinessMultiTenantConntionstringDto>>([]);
    const [paginationConfig, setPaginationConfig] = useState<initPaginationConfig>(new initPaginationConfig());
    const [formData] = Form.useForm();
    const [currentId, setcurrentId] = useState<string>("");
    const [tenantId, settenantId] = useState<string>("");
    const columns = [
        {
            title: "服务名称",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "字符串",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "操作",
            dataIndex: "id",
            key: "id",
            render: (text: any, record: IBusinessMultiTenantConntionstringDto) => {
                return <div>
                    {/* <Button type="primary" onClick={() => editRow(record.id)}>编辑</Button>
                    <Button type="primary" onClick={() => addConntionstring(record.id)}>添加数据库链接</Button> */}
                    <Button type="primary" danger onClick={() => deleteRow(record.id)}>删除</Button>
                </div>
            }
        }
    ];
    /**
     * 删除
     * @param _id 
     */
    const deleteRow = (_id: string) => {
        _multitenantservice.deleteConntionstring(tenantId, _id).then(res => {
            if (res.success) {
                message.success(res.message, 3)
                getTable(tenantId, paginationConfig.current, paginationConfig.pageSize)
            }
        });

    };
    /**
     * 页面初始化事件
     */
    useEffect(() => {
    }, [paginationConfig]);
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
     * 操作类型
     */
    const [operationType, setOperationType] = useState<OperationTypeEnum>(OperationTypeEnum.view);
    /**
     * 父组件调用子组件事件处理
     */
    useImperativeHandle(props.operationRef, () => ({
        changeVal: (_operationType: OperationTypeEnum, _id?: string) => {
            setOperationType(_operationType);
            switch (_operationType) {
                case OperationTypeEnum.view:
                    _id && getTable(_id, paginationConfig.current, paginationConfig.pageSize)
                    _id && settenantId(_id);
                    break;
            }
        }
    }));
    /**
     * 页面初始化获取数据
     */
    const getTable = (_tenantid: string, page: number, pageSize?: number) => {
        var param = {
            pageIndex: page,
            pageRow: pageSize,
        }
        _multitenantservice.getpageConntionstring(_tenantid, param).then((x) => {
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
    };
    return (
        <div>
            <Drawer title={operationState.title} closable={false} maskClosable={false} width={640}
                placement="right" onClose={onCancel} visible={operationState.visible}>
                <Row>
                    <Col span="24" style={{ textAlign: 'right' }}>
                        <Button style={{ margin: '0 8px' }} onClick={() => onCancel()}>关闭</Button>
                    </Col>
                </Row>
                <Table bordered columns={columns} dataSource={tableData} pagination={pagination} />
            </Drawer>
        </div>
    )
};
export default MultitenantConntionstringPage;