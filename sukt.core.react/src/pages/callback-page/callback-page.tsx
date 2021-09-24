import "./callback-page.less";

import { Spin, message } from 'antd';
import { useEffect, useState } from 'react';

import ApplicationUserManager from '@/shared/ids4/identityServerLogin';
import { IMenuService } from '@/core/domain/menu-domain/service/IMenuService';
import { IocTypes } from '@/shared/config/ioc-types';
import useProvider from '@/shared/customHooks/provider';

const CallbackPage = (props: { history: any }) => {
  const menus: IMenuService = useProvider(IocTypes.MenuService);
  const [loading, setLoad] = useState(true);
  const loginCallbackFn = async () => {
    await ApplicationUserManager.signinRedirectCallback();
    const user = await ApplicationUserManager.getUser();
    if (user !== null && typeof user.access_token !== "undefined") {
      localStorage.setItem("token", user.access_token);
      // getMenus();
      props.history.push("/home");
      setLoad(false);
      props.history.go();
    }
  }

  const getMenus = async () => {
    try {
      const res = await menus.getMenus();
      if (res.success) {
        menus.setMenus(res.data);
        message.success(res.message);
      } else {
        message.error(res.message);
      }

    } catch (error:any) {
      message.error(error);
    }
  }
  useEffect(() => {
    loginCallbackFn();
  })

  return (
    <>
      {loading ? <Spin className="sukt-callback-loading" /> : <></>}
    </>
  )
}

export default CallbackPage;