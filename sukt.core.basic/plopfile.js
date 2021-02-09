/**
 * @description 返回文件生成的路径
 * @param {*} data action返回的data信息
 */
function returnBaseDirPath(data) {
  let splitName = data.name.split("_");
  let name = "";
  let basePath = "";
  if (splitName.length > 1) {
    name = splitName[1];
    basePath = `src/pages/${splitName[0]}/${name}/${name}`;
  } else {
    name = data.name;
    basePath = `src/pages/${name}/${name}`;
  }
  data.name = name;
  return basePath;
}

/**
 * @description 返回action要添加的文件列表
 * @param {*} _templateFile 模板文件
 * @param {*} _basePath 生成文件的路径
 */
function returnBaseList(_templateFile, _basePath) {
  let list = [
    {
      type: "add",
      path: `${_basePath}.tsx`,
      templateFile: `plop-template/${_templateFile}/${_templateFile}.tsx`,
      skipIfExists: true,
      abortOnFail: true
    },
    {
      type: "add",
      path: `${_basePath}.less`,
      templateFile: `plop-template/${_templateFile}/${_templateFile}.less`,
      skipIfExists: true,
      abortOnFail: true
    },
  ];
  return list;
}

module.exports = function (plop) {
  // 基础模板组件
  plop.setGenerator("views文件夹component", {
    description: "页面组件",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "组件的名字，如task-management:"
      }
    ],
    actions: function (data) {
      return returnBaseList("common", returnBaseDirPath(data));
    }
  });
  // 逻辑层
  plop.setGenerator("main-domain", {
    description: "逻辑层",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "创建文件,输入文件名,例如:xxx-domain："
      }
    ],
    actions: function (data) {
      let Name = data.name.split("-")[0];
      let Upper = Name.replace(Name[0], Name[0].toUpperCase());
      let list = [
        {
          type: "add",
          path: `src/core/domain/${data.name}/entity/${Upper}Dto.ts`,
          skipIfExists: true,
          abortOnFail: true
        },
        {
          type: "add",
          path: `src/core/domain/${data.name}/entity/I${Upper}.ts`,
          skipIfExists: true,
          abortOnFail: true
        },
        {
          type: "add",
          path: `src/core/domain/${data.name}/service/I${Upper}Service.ts`,
          template: `export interface I${Upper}Service {}`,
          skipIfExists: true,
          abortOnFail: true
        },
        {
          type: "add",
          path: `src/core/domain/${data.name}/service/${Upper}Service.ts`,
          template: `import { injectable } from "inversify";\nimport "reflect-metadata";\nimport { I${Upper}Service } from "./I${Upper}Service";\n@injectable()\nexport default class ${Upper}Service implements I${Upper}Service {}`,
          skipIfExists: true,
          abortOnFail: true
        },
        {
          type: "append",
          path: "src/shared/config/ioc-types.ts",
          pattern: /\{/g,
          template: `  ${Upper}Service: Symbol("${Upper}Service"),`,
          skipIfExists: true,
          abortOnFail: true
        },
        {
          type: "append",
          path: "src/shared/config/inversify.config.ts",
          pattern: /(ioc-types")/g,
          template: `import { I${Upper}Service } from "@/core/domain/${data.name}/service/I${Upper}Service.ts";\nimport ${Upper}Service from "@/core/domain/${data.name}/service/${Upper}Service.ts";\n`,
          skipIfExists: true
        },
      ];
      return list;
    }
  });
}