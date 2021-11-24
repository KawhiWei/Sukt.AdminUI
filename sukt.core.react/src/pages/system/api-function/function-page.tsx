import { Button, Col, PaginationProps, Row, Table, Tag, message } from "antd";
import { initPaginationConfig, tacitPagingProps } from "../../../shared/ajax/request"
import { useEffect, useMemo, useRef, useState } from "react";

import FunctionOperation from "./function-operation";
import { IFunctionDto } from "../../../core/domain/system/api-function/function-entity";
import { IFunctionService } from "@/core/domain/system/api-function/ifunction-service";
import { IRoleService } from "../../../core/domain/system/role/irole-service";
import { IocTypes } from "../../../shared/config/ioc-types";
import { OperationTypeEnum } from "../../../shared/operation/operationType";
import useHookProvider from "../../../shared/customHooks/ioc-hook-provider";

/**
 * 用户列表组件
 */
const FunctionPage = () => {
    const _functionservice: IFunctionService = useHookProvider(IocTypes.FunctionService);
    const [loading, setloading] = useState<boolean>(false);
    const [paginationConfig, setPaginationConfig] = useState<initPaginationConfig>(new initPaginationConfig());
    const [tableData, setTableData] = useState<Array<IFunctionDto>>([]);
    const [subOperationElement, setOperationElement] = useState<any>(null);
    /**
     * 页面初始化事件
     */
    useEffect(() => {
        getTable(paginationConfig.current, paginationConfig.pageSize)
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
     * 页面初始化获取数据
     */
    const getTable = (page: number, pageSize?: number) => {
        setOperationElement(null);
        var param = {
            pageIndex: page,
            pageRow: pageSize,
        }
        _functionservice.getpage(param).then((x) => {
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
    const deleteRow = (_id: string) => {
        _functionservice.delete(_id).then(res => {
            if (res.success) {
                message.success(res.message, 3)
                getTable(paginationConfig.current, paginationConfig.pageSize)
            }
        });

    };
    const columns = [
        {
            title: "接口名称",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "API地址",
            dataIndex: "linkUrl",
            key: "linkUrl",
        },
        {
            title: "描述",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "是否启用",
            dataIndex: "id",
            key: "id",
            render: (text: any, record: IFunctionDto) => {
                return <div>
                    {record.isEnabled === true && (
                        <Tag color="processing">是</Tag>

                    )}
                    {record.isEnabled === false && (
                        <Tag color="error">否</Tag>
                    )}
                </div>
            }
        },
        {
            title: "操作",
            dataIndex: "id",
            key: "id",
            render: (text: any, record: IFunctionDto) => {
                return <div>
                    <Button type="primary" onClick={() => editRow(record.id)}>编辑</Button>
                    <Button type="primary" danger onClick={() => deleteRow(record.id)}>删除</Button>
                </div>
            }
        }
    ];    
    /**
     * 修改任务
     * @param _id 
     */
    const editRow = (_id: any) => {
        setOperationElement(<FunctionOperation onCallbackEvent={getTable} operationType={OperationTypeEnum.edit} id={_id}/>)
    }
    const addChange = () => {
        setOperationElement(<FunctionOperation onCallbackEvent={getTable} operationType={OperationTypeEnum.add}/>)
    }
    return (
        <div>
            <Row>
                <Button type="primary" onClick={() => { addChange() }}>添加</Button>
                <Button type="primary" onClick={() => { }}>查询</Button>
            </Row>
            <Table bordered columns={columns} dataSource={tableData} loading={loading} pagination={pagination} />
            {subOperationElement}
        </div>)
};
export default FunctionPage;