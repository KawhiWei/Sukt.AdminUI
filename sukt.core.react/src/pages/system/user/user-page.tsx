import { Button, Col, PaginationProps, Row, Table, Tag, message } from "antd";
import { initPaginationConfig, tacitPagingProps } from "../../../shared/ajax/request"
import { useEffect, useMemo, useRef, useState } from "react";

import { Guid } from "guid-typescript";
import { IBusinessUserDto } from "../../../core/domain/system/user/user-entity";
import { IUserService } from "@/core/domain/system/user/iuser-service";
import { IocTypes } from "../../../shared/config/ioc-types";
import { OperationTypeEnum } from "../../../shared/operation/operationType";
import UserAllocationRole from "./user-allocationRole";
import UserOperation from "./user-operation";
import useHookProvider from "../../../shared/customHooks/ioc-hook-provider";

/**
 * 用户列表组件
 */
const UserPage = () => {
    const _userservice: IUserService = useHookProvider(IocTypes.UserService);
    const [loading, setloading] = useState<boolean>(false);
    const [paginationConfig, setPaginationConfig] = useState<initPaginationConfig>(new initPaginationConfig());
    const pagination: PaginationProps = {
        ...tacitPagingProps,
        total:paginationConfig.total,
        current:paginationConfig.current,
        pageSize:paginationConfig.pageSize,
        onShowSizeChange: (current: number, pageSize: number) => {
          
        },
        onChange: (page: number, pageSize?: number) => {
            setPaginationConfig((Pagination) => {
                Pagination.current = page;
                if(pageSize)
                {
                    Pagination.pageSize = pageSize ;
                }
                return Pagination;
            });
        }
      };
    /**
     * 父组件获取子组件所有内容
     */
    const userOperationRef = useRef<any>();
    /**
     * 父组件获取子组件所有内容
     */
    const userAllocationRoleRef = useRef<any>();

    /**
     * 页面初始化事件
     */
    useEffect(() => {
        getTable();
    }, [paginationConfig]);
    /**
     * 页面初始化获取数据
     */
    const getTable = () => {
        _userservice.getpage().then((x) => {
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
        _userservice.delete(_id).then(res => {
            if (res.success) {
                message.success(res.message, 3)
                getTable();
            }
        });

    };
    const userAllocationRole = (_id: string) => {
        userAllocationRoleRef.current && userAllocationRoleRef.current.changeVal(_id);
    }
    const columns = [
        {
            title: "姓名",
            dataIndex: "userName",
            key: "userName",
        },
        {
            title: "登录账号",
            dataIndex: "normalizedUserName",
            key: "normalizedUserName",
        },
        {
            title: "用户昵称",
            dataIndex: "nickName",
            key: "nickName",
        },
        {
            title: "电子邮箱",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "手机号码",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
        {
            title: "性别",
            dataIndex: "sex",
            key: "sex",
        },
        {
            title: "身份证号",
            dataIndex: "idCard",
            key: "idCard",
        },
        {
            title: "生日",
            dataIndex: "birthday",
            key: "birthday",
        },
        {
            title: "学历",
            dataIndex: "education",
            key: "education",
        },
        {
            title: "专业技术等级",
            dataIndex: "technicalLevel",
            key: "technicalLevel",
        },
        {
            title: "是否启用",
            dataIndex: "id",
            key: "id",
            render: (text: any, record: IBusinessUserDto) => {
                return <div>

                </div>
            }
        },
        {
            title: "操作",
            dataIndex: "id",
            key: "id",
            render: (text: any, record: IBusinessUserDto) => {
                return <div>
                    <Button type="primary" onClick={() => editRow(record.id)}>编辑</Button>
                    <Button type="primary" onClick={() => userAllocationRole(record.id)}>分配角色</Button>
                    <Button type="primary" danger onClick={() => deleteRow(record.id)}>删除</Button>
                </div>
            }
        }
    ];
    /**
     * 渲染子组件
     */
    const renderOperation = useMemo(() => {
        return (<UserOperation operationRef={userOperationRef} onCallbackEvent={getTable}></UserOperation>)
    }, [])
    /**
     * 渲染子组件
     */
    const renderAllocationRole = useMemo(() => {
        return (<UserAllocationRole operationRef={userAllocationRoleRef}></UserAllocationRole>)
    }, [])
    const [tableData, setTableData] = useState<Array<IBusinessUserDto>>([]);
    /**
     * 修改任务
     * @param _id 
     */
    const editRow = (_id: any) => {
        userOperationRef.current && userOperationRef.current.changeVal(OperationTypeEnum.edit, _id);
    }
    const addChange = () => {
        userOperationRef.current && userOperationRef.current.changeVal(OperationTypeEnum.add);
    }
    return (<div>
        <Row>
            <Button type="primary" onClick={() => { addChange() }}>添加</Button>
            <Button type="primary" onClick={() => { }}>查询</Button>
        </Row>
        <Row>
            <Col span={24}><Table bordered columns={columns} dataSource={tableData} loading={loading} pagination={pagination} /></Col>
        </Row>
        {renderAllocationRole}
        {renderOperation}
    </div>)
};
export default UserPage;