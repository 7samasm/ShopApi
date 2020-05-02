module.exports = {
  preset: "ts-jest",
  // testEnvironment: 'node',
  roots: [
    '<rootDir>/src'
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  // testPathIgnorePatterns : ['node_modules','dist'],
  // setupFiles : ['<rootDir>/testSetup.ts']
}