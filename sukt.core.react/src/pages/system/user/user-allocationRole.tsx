import { Button, Col, Drawer, Form, PaginationProps, Row, Table, Tag, message } from "antd";
import { initPaginationConfig, tacitPagingProps } from "@/shared/ajax/request";
import { useEffect, useImperativeHandle, useState } from "react";

import { IBusinessRoleDto } from "@/core/domain/system/role/role-entity";
import { IOperationConfig } from "../../../shared/operation/operationConfig";
import { IRoleService } from "@/core/domain/system/role/irole-service";
import { IUserService } from "@/core/domain/system/user/iuser-service";
import { IocTypes } from "@/shared/config/ioc-types";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

interface IProp {
    /**
     * 
     */
    operationRef?: any;
    /**
     * 操作成功回调事件
     */
    onCallbackEvent?: any;
    /**
     * Id
     */
    id: string;
}
/**
 * 
 */
const UserAllocationRole = (props: IProp) => {
    const _roleservice: IRoleService = useHookProvider(IocTypes.RoleService);
    const _userservice: IUserService = useHookProvider(IocTypes.UserService);
    const [operationState, setOperationState] = useState<IOperationConfig>({ visible: false })
    const [tableData, setTableData] = useState<Array<IBusinessRoleDto>>([]);
    const [isRefrensh, setRefrensh] = useState<boolean>(true);
    const [paginationConfig, setPaginationConfig] = useState<initPaginationConfig>(new initPaginationConfig());
    /**
     * 表格选中值
     */
    const [roleSelectedRowKeys, setRoleSelectedRowKeys] = useState<Array<string>>([]);
    /**
     * 修改弹框属性
     * @param _visible 
     * @param _title 
     */
    const editOperationState = (_visible: boolean, _title?: string) => {
        setOperationState({ visible: _visible, title: _title });
    }
    const onSelectChange = (selectedRows: any) => {
        setRoleSelectedRowKeys(selectedRows);
    }
    const rowSelection = {
        selectedRowKeys: roleSelectedRowKeys,
        onChange: onSelectChange,
        preserveSelectedRowKeys: true
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
            title: "是否超级管理员",
            dataIndex: "id",
            key: "id",
            render: (text: any, record: IBusinessRoleDto) => {
                return <div>
                    {record.isAdmin === true && (<Tag color="#f50">是</Tag>)}
                    {record.isAdmin === false && (<Tag color="#2db7f5">否</Tag>)}
                </div>
            }
        }
    ];
    /**
     * 页面初始化事件
     */
    useEffect(() => {
        getLoadUserRole()
    }, [isRefrensh]);
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
                if (!operationState.visible) {
                    editOperationState(true);
                }
                setRefrensh(false);
            }
        });

    };
    const getLoadUserRole = () => {
        setPaginationConfig((PaginationConfig) => {
            PaginationConfig = new initPaginationConfig()
            return PaginationConfig;
        });
        _userservice.getLoadUserRole(props.id).then(res => {
            if (res.success) {
                setRoleSelectedRowKeys(res.data);
                getTable(paginationConfig.current, paginationConfig.pageSize)
            }
        })
    }
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
            getTable(current, pageSize);
        },
        onChange: (page: number, pageSize?: number) => {
            setPaginationConfig((Pagination) => {
                Pagination.current = page;
                if (pageSize) {
                    Pagination.pageSize = pageSize;
                }
                return Pagination;
            });
            getTable(page, pageSize);
        }
    };

    const onSave = () => {
        _userservice.userAllocationRole(props.id, roleSelectedRowKeys).then(res => {
            if (res.success) {
                editOperationState(false);
                setRoleSelectedRowKeys([]);
                props.onCallbackEvent && props.onCallbackEvent();
                message.success(res.message, 3)
            } else {
                message.error(res.message, 3)
            }
        });
    }

    /**
     * 抽屜取消事件
     */
    const onCancel = () => {
        editOperationState(false)
        props.onCallbackEvent && props.onCallbackEvent();
    };
    return (
        <div>
            <Drawer title={operationState.title} closable={false} maskClosable={false} width={640}
                placement="right" onClose={onCancel} visible={operationState.visible}>
                <Row>
                    <Col span="24" style={{ textAlign: 'right' }}>
                        <Button style={{ margin: '0 8px' }} onClick={() => onCancel()}>取消</Button>
                        <Button style={{ margin: '0 8px' }} type="primary" onClick={() => onSave()}>保存</Button>
                    </Col>
                </Row>
                <Table rowSelection={rowSelection} bordered columns={columns} dataSource={tableData} pagination={pagination} />
            </Drawer>
        </div>
    );
}
export default UserAllocationRole;