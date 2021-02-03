import React from 'react';
import ApplicationUserManager from '@/shared/ids4/identityServerLogin';
class CallbackPage extends React.Component<{ history: any }> {
  componentWillMount() {
    this.loginCallbackFn();
  }

  async loginCallbackFn() {
    await ApplicationUserManager.signinRedirectCallback();
    let user = await ApplicationUserManager.getUser();
    console.log(user)
    if (user !== null && typeof user.access_token !== "undefined") {
      localStorage.setItem("token", user.access_token);
      this.props.history.push("/home");
      this.props.history.go();
    }
  }
  // async getUserMenuTree() {
  //   // let res = await MainManager.Instance().MenuService.getUserMenuTreeAsync_domain();
  //   // 存储menu menuMap
  //   // MainManager.Instance().MenuService.getMenuList(res.data);
  // }
  render() {
    return (
      <></>
    )
  }
}
export default CallbackPage;