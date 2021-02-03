const defaultConsts = {
  userManagement: {
    defaultAdminUserName: "admin"
  },
  localization: {
    defaultLocalizationSourceName: "Vicutu"
  },
  authorization: {
    encrptedAuthTokenName: "enc_auth_token"
  },
  appBaseUrl: "http://localhost:8080",
  remoteServiceBaseUrl: "http://localhost:5001",
  token_root: "http://localhost:9800",
  response_type: "id_token token",
  client_id: "IDNWebClient",
  scope:
    "openid profile roles IDN.Services.BasicsService.API DAS.Subject.API IDN.MapHierarchy.API IDN.VPT.Services.API"
};

const env = process.env.NODE_ENV;
switch (env) {
  case "development":
    // 测试站点
    defaultConsts.appBaseUrl = "http://localhost:6017";
    // defaultConsts.remoteServiceBaseUrl = "http://10.1.40.207:8042";
    defaultConsts.token_root = "http://10.1.40.207:8042";
    defaultConsts.client_id = "IDNWebClient";
    break;
  case "production":
    defaultConsts.appBaseUrl = "http://10.1.40.210:9863";
    // defaultConsts.remoteServiceBaseUrl = "http://10.1.40.207:8042";
    defaultConsts.token_root = "http://10.1.40.207:8042";
    defaultConsts.client_id = "IDNWebDevClient";
    break;
}

export default defaultConsts;
