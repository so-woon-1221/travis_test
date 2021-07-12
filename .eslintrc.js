module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "next", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    quotes: ["error", "double"], // 쌍따옴포
    "@typescript-eslint/quotes": ["error", "double"], //쌍따옴표
    "no-unused-vars": "off", // 사용안한 변수 경고
    "@typescript-eslint/no-unused-vars": "warn", // 사용 안한 변ㅅ ㅜ경고
    "jsx-ally/control-has-associated-label": "off", //상호작용하는 엘리먼트에 label을 넣는다
    "react/no-array-index-key": "off", //key값으로 index 사용
    "arrow-body-style": "off", //화살표 함수안에 return 사용 가능
    "react/no-unescaped-entities": "off", //문자열내에서 ' " > } 허용
    "react/prop-types": "off", // proptypes를 사용하지 않음
    "object-curly-newline": "off", //{ 다음줄 바꿈을 갖에로 사용 X
    "react/jsx-one-expression-per-line": "off", //한라인에 여러개의 jsx 사용 가능
    "implicit-arrow-linebreak": "off", //화살표 함수 다음에 줄 바꿈 사용 가능
    "no-shadow": "off", //파일내에 중복이름을 사용 할수 있따.
    "spaced-comment": "off", //주석을 뒤애 달 수 있따
    "operator-linebreak": "off", //연산자 다음에 줄 바꿈을 사용할 수 있따.
    "react/react-in-jsx-scope": "off", //jsx를 사용하여도 react를 꼭 import 하지 않아돟 된다.
    "react/jsx-props-no-spreading": "off", //props를 스프레스 할수 있따.
    "jsx-ally/anchor-is-valid": "off", //next에서는 a에 href 없이 사용
    "global-require": "off", //함수내에 require 사용 가능
    "jsx-ally/label-has-associated-control": "off", //label htmlFor을 사용 x
    "import/prefer-default-export": "off", //export default를 사용
    "no-param-reassign": "off",
    "react/jsx-curly-newline": "off", //jsx안에 }를 새로운 라인에 사용 가능
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".tsx"] },
    ], //jsx 사용 가능한 확장자
    "import/extensions": [
      "error",
      "ignorePackages",
      { js: "never", jsx: "never", ts: "never", tsx: "never", json: "never" },
    ],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "no-plusplus": [2, { allowForLoopAfterthoughts: true }],
    "no-nested-ternary": 0,
    "no-anonymous-default-export": "off",
  },
  settings: {
    "import/resolver": { node: { extensions: [".js", ".jsx", ".ts", ".tsx"] } },
  },
};
