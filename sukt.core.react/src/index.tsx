import "antd/dist/antd.less";
// import LayoutView from "@/layout/layout-view";
import React from 'react';
import ReactDOM from 'react-dom';
import Router from "@/router/index";
import store from "./store";
import { USER_MENU } from "./store/actionType";

// let token = localStorage.getItem('token');
// if(!!token){
// 	//获取个人信息与系统菜单
// 	// api.getMenu().then((res) => {
// 	// 	if(res.success){
// 	// 		store.dispatch({
// 	// 			type: USER_MENU,
// 	// 			data: res.data.menu
// 	// 		})
// 	// 		store.dispatch({
// 	// 			type: USER_INFO,
// 	// 			data: res.data.info
// 	// 		})
// 	// 		ReactDOM.render(
// 	// 			<Router />,
// 	// 			document.getElementById('root')
// 	// 		);
// 	// 	}
// 	// })
// }else{
// 	// ReactDOM.render(
// 	// 	<Router />,
// 	// 	document.getElementById('root')
// 	// );
// }
const token = localStorage.getItem("token");
if (!!token) {
  store.dispatch({
    type: USER_MENU,
    data: require("@/router/constans/index").default
  });
}
ReactDOM.render(
  <React.StrictMode>
    <Router />,
  </React.StrictMode>,

  document.getElementById('sukt')
);
