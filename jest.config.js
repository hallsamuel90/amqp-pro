module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  testMatch: [
    '<rootDir>/src/**/*.test.ts',
    '<rootDir>/test/**/*.integration.ts',
  ]
};