import { Button, Col, PaginationProps, Row, Table, Tag, message } from "antd";
import { initPaginationConfig, tacitPagingProps } from "../../../shared/ajax/request"
import { useEffect, useMemo, useRef, useState } from "react";

import { IBusinessRoleDto } from "../../../core/domain/system/role/role-entity";
import { IRoleService } from "../../../core/domain/system/role/irole-service";
import { IocTypes } from "../../../shared/config/ioc-types";
import { OperationTypeEnum } from "../../../shared/operation/operationType";
import RoleAllocationMenu from "./role-allocationMenu";
import RoleOperation from "./role-operation";
import useHookProvider from "../../../shared/customHooks/ioc-hook-provider";

/**
 * 用户列表组件
 */
const RolePage = () => {
    const _roleservice: IRoleService = useHookProvider(IocTypes.RoleService);
    const [loading, setloading] = useState<boolean>(false);
    const [paginationConfig, setPaginationConfig] = useState<initPaginationConfig>(new initPaginationConfig());
    const [tableData, setTableData] = useState<Array<IBusinessRoleDto>>([]);
    /**
     * 父组件获取子组件所有内容
     */
    const roleOperationRef = useRef<any>();
    const roleAllocationMenuRef = useRef<any>();
    /**
     * 页面初始化事件
     */
    useEffect(() => {
        getTable(paginationConfig.current, paginationConfig.pageSize)
    }, [paginationConfig]);

    const pagination: PaginationProps = {
        ...tacitPagingProps,
        total:paginationConfig.total,
        current:paginationConfig.current,
        pageSize:paginationConfig.pageSize,
        onShowSizeChange: (current: number, pageSize: number) => {
            setPaginationConfig((Pagination) => {
                Pagination.current =current;
                if(pageSize)
                {
                    Pagination.pageSize =pageSize;
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
        var param = {
            pageIndex: page,
            pageRow: pageSize,
        }
        _roleservice.getpage(param).then((x) => {
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
        _roleservice.delete(_id).then(res => {
            if (res.success) {
                message.success(res.message, 3)
                getTable(paginationConfig.current, paginationConfig.pageSize)
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
                    <Button type="primary" onClick={() => roleAllocationMenu(record.id)}>分配菜单</Button>
                    <Button type="primary" danger onClick={() => deleteRow(record.id)}>删除</Button>
                </div>
            }
        }
    ];
    /**
     * 渲染子组件
     */
    const renderOperation = useMemo(() => {
        return (<RoleOperation operationRef={roleOperationRef} onCallbackEvent={getTable}></RoleOperation>)
    }, [])
     /**
     * 渲染子组件
     */
      const renderRoleAllocationMenu = useMemo(() => {
        return (<RoleAllocationMenu operationRef={roleAllocationMenuRef} onCallbackEvent={getTable}></RoleAllocationMenu>)
    }, [])

    /**
     * 分配菜單
     * @param _id 
     */
     const roleAllocationMenu = (_id: any) => {
        roleAllocationMenuRef.current && roleAllocationMenuRef.current.changeVal(_id);
    }
    /**
     * 修改
     * @param _id 
     */
    const editRow = (_id: any) => {
        roleOperationRef.current && roleOperationRef.current.changeVal(OperationTypeEnum.edit, _id);
    }
    const addChange = () => {
        roleOperationRef.current && roleOperationRef.current.changeVal(OperationTypeEnum.add);
    }
    return (
        <div>
            <Row>
                <Button type="primary" onClick={() => { addChange() }}>添加</Button>
                <Button type="primary" onClick={() => { }}>查询</Button>
            </Row>
            <Table  bordered columns={columns} dataSource={tableData} loading={loading} pagination={pagination} />
            {renderOperation}
            {renderRoleAllocationMenu}
        </div>)
};
export default RolePage;