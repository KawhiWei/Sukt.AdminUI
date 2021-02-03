const {
  override,
  addDecoratorsLegacy,
  addLessLoader, // less配置函数
  // fixBabelImports, // 按需加载配置函数
  addWebpackAlias, // /路径别名
  // overrideDevServer
} = require('customize-cra');
const path = require("path");
// const { name } = require("./package");
module.exports = {
  webpack: override(
    addDecoratorsLegacy(),
    // ),
    //     fixBabelImports('import', { // antd 按需加载
    //         libraryName: 'antd',
    //         libraryDirectory: 'es',
    //         style: true  //自动打包相关的样式 默认为 style:'css',这里需要改为true
    //     }),
    addLessLoader(
      {
        lessOptions: {
          javascriptEnabled: true,
          // modifyVars: {
          //   'primary-color': '#1DA57A',
          //   'link-color': '#1DA57A',
          //   'border-radius-base': '2px',
          // }
        }
      }
    ),
    addWebpackAlias({ //路径别名
      '@': path.resolve(__dirname, 'src'),
    }),
    (config) => {

      // config.output.library = `${name}`;
      // config.output.libraryTarget = "umd";
      // config.output.jsonpFunction = `webpackJsonp_${name}`;
      // config.output.globalObject = "window";

      //修改、添加loader 配置 :
      // 所有的loaders规则是在config.module.rules(数组)的第二项
      // 即：config.module.rules[2].oneof  (如果不是，具体可以打印 一下是第几项目)
      // 修改 less 配置 ，规则 loader 在第8项(具体可以打印配置)
      const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
      loaders[8].use.push({
        loader: 'style-resources-loader',
        options: {
          patterns: [
            path.resolve(__dirname, 'src/assets/styles/reset.less'),
            path.resolve(__dirname, 'src/assets/styles/common.less')
          ]//全局引入公共的scss 文件
        }
      })
      return config
    },
  )
}