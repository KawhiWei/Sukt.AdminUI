interface IConfig {
  devIp: string;
  buildIp: string;
}
declare global {
  interface Window {
    config: IConfig;
  }
}
export {};