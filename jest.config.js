module.exports = {
  clearMocks: true,
  globals: {
    'ts-jest': {
      extends: './babel.config.js'
    }
  },
  notify: true,
  notifyMode: 'always',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  roots: ['<rootDir>packages'],
  testMatch: ['**/__tests__/*.+(ts|tsx|js)', '**/*.test.+(ts|tsx|js)'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95
    }
  }
}
