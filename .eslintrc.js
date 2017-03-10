module.exports = {
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },

  "parser": "babel-eslint",
  "extends": "airbnb",

  "rules": {
    "jsx-a11y/no-static-element-interactions": 1,

    "react/jsx-no-bind": 1,
    "react/forbid-prop-types": 1,

    "no-undef": 1,
    "class-methods-use-this": 1,
    "max-len": 1,
    "no-return-assign": 1,
    "no-param-reassign": 1,
    "consistent-return": 1,
  }
}
