export interface SuktAuthServerManagerClientSettings {
    /**
     * 认证服务域名
     */
    authority: string;
    /**
     * 客户端Id
     */
    client_id: string;
    /**
     * 客户端密钥
     */
    client_secret?: string;
    /**
     * 客户端回跳地址 
     */
    redirect_uri: string;
    /**
     * 客户端退出登录会跳地址
     */
    post_logout_redirect_uri: string;
    /**
     * 客户端访问作用域
     */
    scope?: string;
    /**
     * 返回參數
     */
    response_type:string;
}