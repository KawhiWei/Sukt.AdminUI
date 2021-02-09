import React from 'react'
import "./layout-header.less";
import { Button, Layout } from 'antd';
import ApplicationUserManager from '@/shared/ids4/identityServerLogin';

const LayoutHeader = () => {
    const logout = () => {
        localStorage.removeItem("token");
        ApplicationUserManager.Logout();
    }
    return (
        <div>
            <Layout.Header className="sukt-layout__header">
                <Button ghost={true} type="primary" onClick={logout}>退出登录</Button>
            </Layout.Header>
        </div>
    )
};
export default LayoutHeader;