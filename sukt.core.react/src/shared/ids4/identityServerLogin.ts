import { UserManager } from "oidc-client";
import LoginConfig from "./tokenConfig";

export  class ApplicationUserManager extends UserManager {
  constructor() {
    super({
      authority: LoginConfig.authority,
      client_id: LoginConfig.client_id,
      redirect_uri: LoginConfig.redirect_uri,
      response_type: LoginConfig.response_type,
      scope: LoginConfig.scope,
      post_logout_redirect_uri: LoginConfig.post_logout_redirect_uri
    });
  }
  /**
   * 登录
   */
  public async Login() {
    console.log("重定向");
    this.signinRedirect(); // 执行重定向
  }
  /**
   * 登出
   */
  async Logout() {
    console.log("登出");

    return this.signoutRedirect();
  }
}
const applicationUserManager = new ApplicationUserManager();
export { applicationUserManager as default };
