import React, { Component } from 'react'

import { IMenuRouter } from "../core/domain/entities/menurouterentity/menurouter"
import { Link } from 'react-router-dom';
import { Menu } from "antd";

const { SubMenu } = Menu;
interface IProps {
    menu: Array<IMenuRouter>
}

export default class MenuComponent extends Component<IProps> {
    menus: Array<IMenuRouter> = []
    constructor(props: any) {
        super(props)
        this.menus = this.props.menu;
    }
    isShow = (_children: IMenuRouter[]) => {
        return _children && _children.length > 0;
    }

    render() {
        return (
            <Menu mode="inline" theme="light" style={{ width: 256 }} >
                {
                    this.menus.map((_menu: IMenuRouter) => {
                        return this.isShow(_menu.children) ?
                            (<SubMenu key={_menu.key} title={_menu.title}>{_menu.children.map((_chil: IMenuRouter) => { return <Menu.Item key={_chil.key} title={_chil.title} ><Link to={_chil.path}>{_chil.title}</Link></Menu.Item> })}</SubMenu>) : (<Menu.Item key={_menu.key} title={_menu.title}><Link to={_menu.path}>{_menu.title}</Link></Menu.Item>)
                    })
                }
            </Menu>
        )
    }
}
