import { Button, Col, PaginationProps, Row, Table, Tag, message } from "antd";
import { initPaginationConfig, tacitPagingProps } from "../../../shared/ajax/request"
import { useEffect, useMemo, useRef, useState } from "react";

import { IMultiTenantDto } from "@/core/domain/system/multitenant/multitenant-entity";
import { IMultitenantService } from "@/core/domain/system/multitenant/imultitenant-service";
import { IocTypes } from "@/shared/config/ioc-types";
import MultitenantConntionstringOperation from "./multitenant-conntionstring-operation";
import MultitenantConntionstringPage from "./multitenant-conntionstring-page";
import MultitenantOperation from "./multitenant-operation";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

const MultitenantPage = () => {
    const _multitenantservice: IMultitenantService = useHookProvider(IocTypes.MultitenantService);
    const [loading, setloading] = useState<boolean>(false);
    const [tableData, setTableData] = useState<Array<IMultiTenantDto>>([]);
    const [paginationConfig, setPaginationConfig] = useState<initPaginationConfig>(new initPaginationConfig());
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
                    <Button type="primary" onClick={() => addConntionstring(record.id)}>添加数据库链接</Button>
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
    const editRow = (_id: any) => {
        OperationRef.current && OperationRef.current.changeVal(OperationTypeEnum.edit, _id);
    }
    /**
     * 查看链接列表
     * @param _id 
     */
     const selectConntionstringPage = (_id: any) => {
        MultitenantConntionstringPageRef.current && MultitenantConntionstringPageRef.current.changeVal(OperationTypeEnum.view, _id);
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
            }
        });

    };
    /**
     * 添加服务链接字符串
     * @param _id 
     */
    const addConntionstring = (_id: string) => {
        MultitenantConntionstringOperationRef.current && MultitenantConntionstringOperationRef.current.changeVal(OperationTypeEnum.add, _id);

    };


    /**
     * 父组件获取子组件所有内容
     */
    const OperationRef = useRef<any>();
    /**
     * 父组件获取子组件所有内容
     */
    const MultitenantConntionstringOperationRef = useRef<any>();
    /**
     * 父组件获取子组件所有内容
     */
     const MultitenantConntionstringPageRef = useRef<any>();
    /**
     * 渲染子组件
     */
    const renderOperation = useMemo(() => {
        return (<MultitenantOperation operationRef={OperationRef} onCallbackEvent={getTable}></MultitenantOperation>)
    }, [])
    /**
     * 渲染子组件
     */
    const renderConntionstringOperation = useMemo(() => {
        return (<MultitenantConntionstringOperation operationRef={MultitenantConntionstringOperationRef} onCallbackEvent={getTable}></MultitenantConntionstringOperation>)
    }, [])
    /**
     * 渲染子组件
     */
     const MultitenantConntionstringPageDrawer = useMemo(() => {
        return (<MultitenantConntionstringPage  operationRef={MultitenantConntionstringPageRef} onCallbackEvent={getTable}></MultitenantConntionstringPage>)
    }, [])
    const addChange = () => {
        OperationRef.current && OperationRef.current.changeVal(OperationTypeEnum.add);
    }
    return (
        <div>
            <Row>
                <Button type="primary" onClick={() => { addChange() }}>添加</Button>
                <Button type="primary" onClick={() => { }}>查询</Button>
            </Row>
            <Table bordered columns={columns} dataSource={tableData} loading={loading} pagination={pagination} />
            {renderOperation}
            {renderConntionstringOperation}
            {MultitenantConntionstringPageDrawer}
        </div>)
}
export default MultitenantPage;