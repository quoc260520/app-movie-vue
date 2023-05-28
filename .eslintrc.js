module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false,
  },
  extends: ["@nuxtjs", "plugin:nuxt/recommended", "prettier"],
  plugins: [],

  // add your custom rules here

  rules: {
    "max-len": ["error", { code: 200, ignoreUrls: true }],
    curly: ["error", "all"],
    "lines-around-comment": [
      "error",
      {
        beforeBlockComment: true,
        afterBlockComment: true,
        beforeLineComment: true,
        afterLineComment: true,
        allowBlockStart: true,
        allowBlockEnd: true,
        allowObjectStart: true,
        allowObjectEnd: true,
        allowArrayStart: true,
        allowArrayEnd: true,
      },
    ],
    "no-confusing-arrow": ["error", { allowParens: false }],
    "no-mixed-operators": "error",
    "no-tabs": ["error", { allowIndentationTabs: true }],
    "no-unexpected-multiline": "error",
    quotes: [
      "error",
      "double",
      { avoidEscape: true, allowTemplateLiterals: false },
    ],
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "any",
        },
      },
    ],
  },
}
