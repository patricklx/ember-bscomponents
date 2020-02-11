module.exports = {
  "parserOptions": {
    "sourceType": "module",
    "allowImportExportEverywhere": false,
    "codeFrame": true
  },
  plugins: [
    'ember'
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended' // or 'plugin:ember/base'
  ],
  parser: "babel-eslint",
  env: {
    browser: true
  },
  rules: {
    "import/extensions": "off",
    "node/no-unsupported-features": "off",
    "arrow-body-style": "off",
    "comma-dangle": "off",
    "func-names": "off",
    "global-require": "off",
    "keyword-spacing": ["error"],
    "no-console": "off",
    "no-param-reassign": "off",
    "no-plusplus": ["error", {
      "allowForLoopAfterthoughts": true
    }],
    "no-underscore-dangle": "off",
    "no-unused-vars": ["error", {
      "args": "none"
    }],
    "no-use-before-define": ["error", {
      "functions": false
    }],
    "max-len": ["error", 120],
    "object-shorthand": "off",
    "prefer-arrow-callback": "off",
    "prefer-rest-params": "off",
    "spaced-comment": "off",
    "space-before-function-paren": ["error", "never"],
    "strict": "error",
    "vars-on-top": "off",

    "import/no-dynamic-require": "off",
    "import/no-extraneous-dependencies": "off",
    "node/no-unpublished-require": "off",

    "prefer-template": "off",
    "prefer-spread": "off",
    "object-curly-spacing": ["error", "always"],
    "space-before-blocks": ["error", "always"],
    "space-in-parens": ["error", "never"],
    "padded-blocks": "off",
    "no-else-return": "off",
    "no-empty": "off",
    "prefer-const": ["error", {
      "destructuring": "all"
    }],
    "class-methods-use-this": "off"
  }
};
