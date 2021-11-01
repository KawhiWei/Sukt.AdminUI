import { Button, Col, PaginationProps, Row, Table, Tag, message } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";

import { IBusinessRoleDto } from "../../../core/domain/system/role/role-entity";
import { IRoleService } from "../../..//core/domain/system/role/irole-service";
import { IocTypes } from "../../../shared/config/ioc-types";
import { OperationTypeEnum } from "../../../shared/operation/operationType";
import RoleOperation from "./role-operation";
import { initPaginationConfig } from "../../../shared/ajax/request"
import useHookProvider from "../../../shared/customHooks/ioc-hook-provider";

/**
 * 用户列表组件
 */
const RolePage = () => {
    const _roleservice: IRoleService = useHookProvider(IocTypes.RoleService);
    const [loading, setloading] = useState<boolean>(false);
    const [pagination, setPagination] = useState<PaginationProps>(
        initPaginationConfig
    );
    /**
     * 父组件获取子组件所有内容
     */
    const menuOperationRef = useRef<any>();
    /**
     * 页面初始化事件
     */
    useEffect(() => {
        getTable();
    }, [pagination]);
    /**
     * 页面初始化获取数据
     */
    const getTable = () => {
        _roleservice.getpage().then((x) => {
            if (x.success) {
                setPagination((Pagination) => {
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
        _roleservice.delete(_id).then(res => {
            if (res.success) {
                message.success(res.message, 3)
                getTable();
            }
        });

    };
    const columns = [
        {
            title: "角色名称",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "标准化角色名称",
            dataIndex: "normalizedName",
            key: "normalizedName",
        },
        {
            title: "是否启用",
            dataIndex: "id",
            key: "id",
            render: (text: any, record: IBusinessRoleDto) => {
                return <div>

                </div>
            }
        },
        {
            title: "操作",
            dataIndex: "id",
            key: "id",
            render: (text: any, record: IBusinessRoleDto) => {
                return <div>
                    <Button type="primary" onClick={() => editRow(record.id)}>编辑</Button>
                    <Button type="primary" danger onClick={() => deleteRow(record.id)}>删除</Button>
                </div>
            }
        }
    ];
    /**
     * 渲染子组件
     */
    const renderOperation = useMemo(() => {
        return (<RoleOperation operationRef={menuOperationRef} onCallbackEvent={getTable}></RoleOperation>)
    }, [])
    const [tableData, setTableData] = useState<Array<IBusinessRoleDto>>([]);
    /**
     * 修改任务
     * @param _id 
     */
    const editRow = (_id: any) => {
        menuOperationRef.current && menuOperationRef.current.changeVal(OperationTypeEnum.edit, _id);
    }
    const addChange = () => {
        menuOperationRef.current && menuOperationRef.current.changeVal(OperationTypeEnum.add);
    }
    return (<div>
        <Row>
            <Button type="primary" onClick={() => { addChange() }}>添加</Button>
            <Button type="primary" onClick={() => { }}>查询</Button>
        </Row>
        <Row>
            <Col span={24}><Table bordered columns={columns} dataSource={tableData} loading={loading} pagination={pagination} /></Col>
        </Row>
        {renderOperation}
    </div>)
};
export default RolePage;