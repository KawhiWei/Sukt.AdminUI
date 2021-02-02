import "antd/dist/antd.css";
import LayoutView from "@/layout/layout-view";
import React from 'react';
import ReactDOM from 'react-dom';


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

ReactDOM.render(
  <React.StrictMode>
    <LayoutView />
  </React.StrictMode>,
  document.getElementById('sukt')
);
