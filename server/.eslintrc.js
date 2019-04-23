module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:prettier/recommended"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error"
  },
  parserOptions: {
    ecmaVersion: 9,
  }
};
