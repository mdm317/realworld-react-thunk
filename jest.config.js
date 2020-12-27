/* eslint-disable */ //eslint 적용안함

module.exports = {
  preset: 'ts-jest',

  "transform": {
    "^.+\\.ts?$": "ts-jest"
  },
  "testRegex": "/__tests__/.*test\.tsx$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

}
