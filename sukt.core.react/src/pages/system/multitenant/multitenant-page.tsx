import { Button, Col, PaginationProps, Row, Table, Tag, message } from "antd";
import { initPaginationConfig, tacitPagingProps } from "../../../shared/ajax/request"
import { useEffect, useMemo, useRef, useState } from "react";

import { IMultiTenantDto } from "@/core/domain/system/multitenant/multitenant-entity";
import { IMultitenantService } from "@/core/domain/system/multitenant/imultitenant-service";
import { IocTypes } from "@/shared/config/ioc-types";
import MultitenantConntionstringPage from "./multitenant-conntionstring-page";
import MultitenantOperation from "./multitenant-operation";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

const MultitenantPage = () => {
    const _multitenantservice: IMultitenantService = useHookProvider(IocTypes.MultitenantService);
    const [loading, setloading] = useState<boolean>(false);
    const [tableData, setTableData] = useState<Array<IMultiTenantDto>>([]);
    const [paginationConfig, setPaginationConfig] = useState<initPaginationConfig>(new initPaginationConfig());
    const [subMultitenantConntionstringPageElement, setMultitenantConntionstringPageElement] = useState<any>(null);
    const [subMultitenantOperationElement, setMultitenantOperationElement] = useState<any>(null);
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
    const columns = [
        {
            title: "公司名称",
            dataIndex: "companyName",
            key: "companyName",
        },
        {
            title: "联系人",
            dataIndex: "linkMan",
            key: "linkMan",
        },
        {
            title: "电话",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
        {
            title: "邮箱地址",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "是否启用",
            dataIndex: "id",
            key: "id",
            render: (text: any, record: any) => {
                return <div>
                    {record.isEnable === true && (
                        <Tag color="processing">是</Tag>

                    )}
                    {record.isEnable === false && (
                        <Tag color="error">否</Tag>
                    )}
                </div>
            }
        },
        {
            title: "操作",
            dataIndex: "id",
            key: "id",
            render: (text: any, record: IMultiTenantDto) => {
                return <div>
                    <Button type="primary" onClick={() => editRow(record.id)}>编辑</Button>
                    <Button type="primary" onClick={() => selectConntionstringPage(record.id)}>查看链接列表</Button>
                    <Button type="primary" danger onClick={() => deleteRow(record.id)}>删除</Button>
                </div>
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
     * 页面初始化获取数据
     */
    const getTable = (page: number, pageSize?: number) => {
        setMultitenantOperationElement(null)
        var param = {
            pageIndex: page,
            pageRow: pageSize,
        }
        _multitenantservice.getpage(param).then((x) => {
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
                setloading(false);
            }
        });
    };
    /**
     * 修改
     * @param _id 
     */
    const editRow = async (_id: any) => {
        setMultitenantOperationElement(<MultitenantOperation onCallbackEvent={getTable} id={_id} operationType={OperationTypeEnum.edit}></MultitenantOperation>)
    }
    const clearMultitenantConntionstringPageElement = () => {
        setMultitenantConntionstringPageElement(null);
    }
    /**
     * 查看链接列表
     * @param _id 
     */
    const selectConntionstringPage = async (_id: any) => {
        setMultitenantConntionstringPageElement(<MultitenantConntionstringPage tenantId={_id} onCallbackEvent={clearMultitenantConntionstringPageElement} />);
    }
    /**
     * 删除
     * @param _id 
     */
    const deleteRow = (_id: string) => {
        _multitenantservice.delete(_id).then(res => {
            if (res.success) {
                message.success(res.message, 3)
                getTable(paginationConfig.current, paginationConfig.pageSize)
            }else {
                message.error(res.message, 3)
            }
        });
    };
    /**
     * 渲染子组件
     */
    const addChange = () => {
        setMultitenantOperationElement(<MultitenantOperation onCallbackEvent={getTable} operationType={OperationTypeEnum.add}></MultitenantOperation>)
    }
    return (
        <div>
            <Row>
                <Button type="primary" onClick={() => { addChange() }}>添加</Button>
                <Button type="primary" onClick={() => { }}>查询</Button>
            </Row>
            <Table bordered columns={columns} dataSource={tableData} loading={loading} pagination={pagination} />
            {subMultitenantOperationElement}
            {subMultitenantConntionstringPageElement}
        </div>)
}
export default MultitenantPage;