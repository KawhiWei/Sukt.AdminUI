import * as MenuEnum from "../../../core/constans/enum/menu";

import { Button, Col, PaginationProps, Row, Table, Tag, message } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";

import { Guid } from "guid-typescript";
import { IBusinessMenuDto } from "@/core/domain/system/menu/menu-entity";
import { IMenuService } from "@/core/domain/system/menu/service/imenu-service";
import { IOperationConfig } from "@/shared/operation/operationConfig";
import { IocTypes } from "@/shared/config/ioc-types";
import MenuOperation from "./menu-operation";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import { initPaginationConfig } from "../../../shared/ajax/request"
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

/**
 * 菜单列表组件
 */
const MenuPage = () => {
    const _menuservice: IMenuService = useHookProvider(IocTypes.MenuService);
    const [OperationState, setOperationState] = useState<IOperationConfig>({
        itemId: Guid.EMPTY,
        title: "",
        visible: false,
        operationType: OperationTypeEnum.view
    })
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
        _menuservice.gettable().then((x) => {
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
        _menuservice.delete(_id).then(res => {
            if (res.success) {
                message.success(res.message, 3)
                getTable();
            }
        });

    };
    /**
     * 渲染子组件
     */
    const renderOperation = useMemo(() => {
        return (<MenuOperation Config={OperationState} operationRef={menuOperationRef} onCallbackEvent={getTable}></MenuOperation>)
    }, [])
    const [tableData, setTableData] = useState<Array<IBusinessMenuDto>>([{
        id: "121214545",
        name: "ada",
        path: "21312",
        component: "21312",
        componentName: "21312",
        parentId: "21312",
        icon: "21312",
        parentNumber: "21312",
        microName: "21312",
        isShow: false,
        sort: 21312,
        buttonClick: "21312",
        type: MenuEnum.EMenuType.Menu,
    }]);
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
export default MenuPage;