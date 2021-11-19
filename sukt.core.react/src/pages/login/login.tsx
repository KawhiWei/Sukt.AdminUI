import ApplicationUserManager from '@/shared/ids4/identityServerLogin';
import { Test } from '@/shared/suktauth/test';
import { useEffect } from 'react';

const Login = (props: { history: any }) => {
  useEffect(() => {
    let test=new Test();
    debugger
    // test.getLogin();

    // ApplicationUserManager.Login();
  }, [props])
  return (
    <></>
  )
}

export default Login;