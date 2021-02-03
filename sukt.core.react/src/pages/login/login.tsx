import React from 'react';
import ApplicationUserManager from '@/shared/ids4/identityServerLogin';
class Login extends React.Component<{ history: any }> {
  componentWillMount() {
    ApplicationUserManager.Login();
  }
  render() {
    return (
      <></>
    )
  }
}
export default Login;