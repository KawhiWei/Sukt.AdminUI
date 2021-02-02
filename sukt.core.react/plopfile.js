module.exports = function (plop) {
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