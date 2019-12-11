module.exports = {
  collectCoverage: true,
  projects: [
    {
      displayName: "test",
      preset: "jest-preset-gatsby/typescript",
      snapshotSerializers: ["jest-emotion"],
      testPathIgnorePatterns: ["/node_modules/", "/dist/"]
    },
    {
      displayName: "lint:prettier",
      preset: "jest-runner-prettier",
      testPathIgnorePatterns: ["/node_modules/", "/dist/", "/coverage/"]
    }
  ]
};
