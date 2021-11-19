import { SuktAuthServerManager } from "./sukt-auth-client";

export class Test extends SuktAuthServerManager {
    constructor() {
        super({
            authority: "https://localhost:5007/connect/authorize",
            client_id: "Sukt.Dashboard",
            redirect_uri: "http://localhost:6017/callback",
            post_logout_redirect_uri: "http://localhost:6017",
            scope: "Sukt.Admin.ApiResourceScope",
            response_type:"id_token token"
        })
    }
    public async getLogin() {
        this.signinRedirect();
    }
}