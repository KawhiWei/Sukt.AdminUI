import "antd/dist/antd.less";
import React from 'react';
import ReactDOM from 'react-dom';
import "./public-path";
import App from './App';

const initApp = (props?: any) => {
  if (props && Object.keys(props).length > 0) {
    // 注入 actions 实例
    // actions.setActions(props);
  }
  ReactDOM.render(<App />, props ? props.container.querySelector('#sukt-basic') : document.querySelector('#sukt-basic'));
}
if (!window.__POWERED_BY_QIANKUN__) {
  initApp();
}
export async function bootstrap(): Promise<void> {
  console.log("basic app bootstraped");
}

export async function mount(props: any): Promise<void> {
  console.log("basic mount", props);
  initApp(props);
}

export async function unmount(): Promise<void> {
  console.log("basic unmount");
  const RootNode = document.getElementById("sukt-basic");
  if (RootNode) {
    ReactDOM.unmountComponentAtNode(RootNode);
  }
}
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('sukt-basic')
// )