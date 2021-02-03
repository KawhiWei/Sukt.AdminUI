import React from 'react';
import ApplicationUserManager from '@/shared/ids4/identityServerLogin';
import { Spin } from 'antd';
import "./callback-page.less";
class CallbackPage extends React.Component<{ history: any }, { loading: boolean }> {
  constructor(props: { history: any }) {
    super(props);
    this.state = {
      loading: true
    }
  }
  componentWillMount() {
    this.loginCallbackFn();
  }

  async loginCallbackFn() {
    await ApplicationUserManager.signinRedirectCallback();
    const user = await ApplicationUserManager.getUser();
    console.log(user)
    if (user !== null && typeof user.access_token !== "undefined") {
      localStorage.setItem("token", user.access_token);
      this.props.history.push("/home");
      this.setState({
        loading: false
      })
      this.props.history.go();
    }
  }
  // async getUserMenuTree() {
  //   // let res = await MainManager.Instance().MenuService.getUserMenuTreeAsync_domain();
  //   // 存储menu menuMap
  //   // MainManager.Instance().MenuService.getMenuList(res.data);
  // }
  render() {
    if (this.state.loading) {
      return (<Spin className="sukt-callback-loading"/>)
    }
    return (<></>)
  }
}
export default CallbackPage;