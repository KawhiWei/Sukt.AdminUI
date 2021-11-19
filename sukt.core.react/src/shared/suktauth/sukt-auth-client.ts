import { client_id, redirect_uri, response_type, scope } from "./sukt-auth-constans";

import { SuktAuthServerManagerClientSettings } from "./suktauthservermanagersettings";
import axios from "axios";

const _axiosConfig = {
    timeout: 60 * 1000,
  };


export class SuktAuthServerManager{
    readonly _settings: SuktAuthServerManagerClientSettings;
    /**
     * 构造函数
     * @param setting 认证服务
     */
    constructor(setting:SuktAuthServerManagerClientSettings){
        this._settings=setting;
    }
    /**
     * 重定向到认证服务
     */
    signinRedirect(){
        let param={
            client_id:this._settings.client_id,
            redirect_uri:this._settings.redirect_uri,
            scope:this._settings.scope,
        }
        axios.get(this._settings.authority,{params:param})
    }
}
