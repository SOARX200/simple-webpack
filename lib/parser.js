const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { transformFromAst } = require('babel-core');

module.export = {
  getAST: (path) => {
    const source = fs.readFileSync(path, "utf-8");

    return parser.parse(source, {
      sourceType: "module",
    });
  },

  getDependencies: (ast) => {
    const dependencies = [];
    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        dependencies.push(node.source.value);
      },
    });
    return dependencies;
  },

  transform: (ast) => {
    const { code } = transformFromAst(ast, null, {
      presets: ["env"],
    });
    return code;
  },
};