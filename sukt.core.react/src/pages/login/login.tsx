import { Button } from 'antd';
import React from 'react';
import store from "@/store";
import { USER_MENU } from '@/store/actionType';
// import ApplicationUserManager from '@/shared/ids4/identityServerLogin';
class Login extends React.Component<{ history: any }> {
  login = () => {
    localStorage.setItem("token", "123");
    store.dispatch({
      type: USER_MENU,
      data: require("@/router/constans/index").default
    });
    this.props.history.replace("/home");
    this.props.history.go();
  }
  // componentWillMount() {
  //   ApplicationUserManager.Login();
  // }
  render() {
    return (
      <Button onClick={this.login}>登錄測試</Button>
    )
  }
  // render() {
  //   return (
  //     <></>
  //   )
  // }
}
export default Login;