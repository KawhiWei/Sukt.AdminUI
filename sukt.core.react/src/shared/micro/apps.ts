export interface IApp {
  name: string;
  entry: string;
  container: string;
  activeRule: string;
  props?: object;
}

const env = process.env.NODE_ENV;
const entry = window.config
  ? env === "development"
    ? window.config.devIp
    : window.config.buildIp
  : process.env.VUE_APP_REMOTE;
const apps = [
  {
    name: "sukt.core.basic",
    entry: `${entry}6016`,
    container: "#frame",
    activeRule: "/basic"
  },
];
export default apps;