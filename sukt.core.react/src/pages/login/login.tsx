import { useEffect } from 'react';
import ApplicationUserManager from '@/shared/ids4/identityServerLogin';
const Login = (props: { history: any }) => {
  useEffect(() => {
    ApplicationUserManager.Login();
  }, [props])
  return (
    <></>
  )
}

export default Login;