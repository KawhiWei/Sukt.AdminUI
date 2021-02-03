import React, { Component } from 'react'
import "./layout-header.less";
import { Button, Layout } from 'antd';
import ApplicationUserManager from '@/shared/ids4/identityServerLogin';

export default class Layoutheader extends Component {
    logout = () => {
        localStorage.removeItem("token");
        ApplicationUserManager.Logout();
    }
    render() {
        return (
            <div>
                <Layout.Header className="sukt-layout__header">
                    <Button ghost={true} type="primary" onClick={this.logout}>退出登录</Button>
                </Layout.Header>
            </div>
        )
    }
}
