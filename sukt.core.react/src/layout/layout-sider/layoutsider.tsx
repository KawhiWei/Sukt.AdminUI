import React, { Component } from 'react'

import { Layout } from 'antd';
import MenuComponent from '../../components/menuComponent';
import { menuList } from "../../core/constans/menuConstans"

const { Sider} = Layout;
export default class Layoutsider extends Component {
    render() {
        return (
            <Sider>
                <MenuComponent menu={menuList}></MenuComponent>
            </Sider>
        )
    }
}
