module.exports = {
  env: {
    browser: true,
  },
  extends: [
    "airbnb-base",
    "eslint:recommended",
    "plugin:vue/essential",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    parser: "babel-eslint", // 词法解析器使用babel-eslint，以更好的适配es6的新api
    ecmaVersion: 6, // 启用 ES6 语法支持;默认设置为3，5（默认）， 你可以使用 6、7、8 或 9 来指定你想要使用的 ECMAScript 版本。你也可以用使用年份命名的版本号指定为 2015（同 6），2016（同 7），或 2017（同 8）或 2018（同 9）
    sourceType: "module", // 设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)。
  },
  plugins: ["vue", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "generator-star-spacing": "off",
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "import/no-extraneous-dependencies": "off",
    "no-param-reassign": "off",
    "no-unused-expressions": "off",
    "no-unused-vars": [
      "error",
      { vars: "all", args: "none", ignoreRestSiblings: false },
    ], // 没有使用的参数，不会报错。因为个人觉的把可用的参数写上去 有利于以后的维护。
    // 要求或禁止命名的 function 表达式 (func-names)
    "func-names": ["error", "never"],
    "prefer-destructuring": "off",
    "no-console": "off",
    "no-debugger": "off",
    "no-loop-func": "off",
    "no-var": "off",
  },
};
