import React from 'react';
class CallbackPage extends React.Component {
  async loginCallbackFn() {
    // await ApplicationUserManager.signinRedirectCallback();

    // let user = await ApplicationUserManager.getUser();
    // // console.log(user, '-----user');
    // if (user !== null) {
    //   if (typeof user.access_token !== "undefined") {
    //     // debugger;
    //     if (typeof user.access_token !== "undefined") {
    //       ShareModule.SaveToken(user.access_token);
    //       ShareModule.SaveUser(user);
    //     }
    //     // ShareModule.SaveToken(user.access_token);
    //     this.getUserMenuTree();
    //     this.$router.push({
    //       path: "/home-page"
    //     });
    //   }
    // }
  }
  async getUserMenuTree() {
    // let res = await MainManager.Instance().MenuService.getUserMenuTreeAsync_domain();
    // 存储menu menuMap
    // MainManager.Instance().MenuService.getMenuList(res.data);
  }
  render() {
    return (
      <></>
    )
  }
}
export default CallbackPage;