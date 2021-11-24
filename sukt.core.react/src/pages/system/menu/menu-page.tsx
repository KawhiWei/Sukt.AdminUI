import * as MenuEnum from "../../../core/constans/enum/menu";

import { Button, Col, PaginationProps, Row, Table, Tag, message } from "antd";
import { initPaginationConfig, tacitPagingProps } from "../../../shared/ajax/request"
import { useEffect, useMemo, useRef, useState } from "react";

import { Guid } from "guid-typescript";
import { IBusinessMenuDto } from "@/core/domain/system/menu/menu-entity";
import { IMenuService } from "@/core/domain/system/menu/service/imenu-service";
import { IOperationConfig } from "@/shared/operation/operationConfig";
import { IocTypes } from "@/shared/config/ioc-types";
import MenuOperation from "./menu-operation";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

/**
 * 菜单列表组件
 */
const MenuPage = () => {
    const _menuservice: IMenuService = useHookProvider(IocTypes.MenuService);
    const [loading, setloading] = useState<boolean>(false);
    const [paginationConfig, setPaginationConfig] = useState<initPaginationConfig>(new initPaginationConfig());
    const [subOperationElement, setOperationElement] = useState<any>(null);
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
        setOperationElement(null);
        _menuservice.gettable().then((x) => {
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
        _menuservice.delete(_id).then(res => {
            if (res.success) {
                message.success(res.message, 3)
                getTable();
            }
        });

    };
    const pagination: PaginationProps = {
        ...tacitPagingProps,
        total: paginationConfig.total,
        current: paginationConfig.current,
        pageSize: paginationConfig.pageSize,
        onShowSizeChange: (current: number, pageSize: number) => {

        },
        onChange: (page: number, pageSize?: number) => {

        }
    };
    const [tableData, setTableData] = useState<Array<IBusinessMenuDto>>([]);
    const columns = [
        {
            title: "菜单名称",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "路径",
            dataIndex: "path",
            key: "path",
        },
        {
            title: "对应组件",
            dataIndex: "component",
            key: "component",
        },
        {
            title: "组件名",
            dataIndex: "componentName",
            key: "componentName",
        },
        {
            title: "菜单icon",
            dataIndex: "icon",
            key: "icon",
        },
        {
            title: "按钮事件",
            dataIndex: "buttonClick",
            key: "buttonClick",
        },
        {
            title: "菜单类型",
            dataIndex: "id",
            key: "id",
            render: (text: any, record: IBusinessMenuDto) => {
                return <div>
                    {record.type === MenuEnum.EMenuType.Menu && (
                        <Tag color="cyan">菜单</Tag>
                    )}
                    {record.type === MenuEnum.EMenuType.Button && (
                        <Tag color="blue">按钮</Tag>
                    )}
                    {record.type === MenuEnum.EMenuType.Tab && (
                        <Tag color="purple">Tab标签页</Tag>
                    )}
                </div>
            }
        },
        {
            title: "操作",
            dataIndex: "id",
            key: "id",
            render: (text: any, record: IBusinessMenuDto) => {
                return <div>
                    <Button type="primary" onClick={() => { editRow(record.id) }}>编辑</Button>
                    <Button type="primary" danger onClick={() => { deleteRow(record.id) }}>删除</Button>
                </div>
            }
        }
    ];
    /**
     * 修改任务
     * @param _id 
     */
    const editRow = (_id: any) => {
        setOperationElement(<MenuOperation operationType={OperationTypeEnum.edit} id={_id} onCallbackEvent={getTable}></MenuOperation>)
    }
    const addChange = () => {
        setOperationElement(<MenuOperation  operationType={OperationTypeEnum.add} onCallbackEvent={getTable}></MenuOperation>)
    }
    return (<div>
        <Row>
            <Button type="primary" onClick={() => { addChange() }}>添加</Button>
            <Button type="primary" onClick={() => { }}>查询</Button>
        </Row>
        <Row>
            <Col span={24}><Table bordered columns={columns} dataSource={tableData} loading={loading} pagination={pagination} /></Col>
        </Row>
        {subOperationElement}
    </div>)
};
export default MenuPage;