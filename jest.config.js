module.exports = {
  collectCoverage: true,
  projects: [
    {
      displayName: "test",
      preset: "jest-preset-gatsby/typescript",
      snapshotSerializers: ["@emotion/jest"],
      testPathIgnorePatterns: ["/node_modules/", "/dist/"]
    },
    {
      displayName: "lint:prettier",
      preset: "jest-runner-prettier",
      testPathIgnorePatterns: ["/node_modules/", "/dist/", "/coverage/"]
    },
    {
      displayName: "lint:stylelint",
      preset: "jest-runner-stylelint",
      testPathIgnorePatterns: ["/node_modules/", "/dist/", "/coverage/"]
    }
  ]
};
