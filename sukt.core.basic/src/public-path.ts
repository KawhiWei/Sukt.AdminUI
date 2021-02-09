declare global {
  interface Window {
    __POWERED_BY_QIANKUN__?: boolean;
    __INJECTED_PUBLIC_PATH_BY_QIANKUN__?: string;
  }
}
// console.log()
if (window.__POWERED_BY_QIANKUN__) {
  // 动态设置 webpack publicPath，防止资源加载出错
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__!;
}
export {};
