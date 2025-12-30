/**
 * Jest Configuration for Backend Testing
 * Configures test environment and coverage reporting
 */
export default {
  testEnvironment: 'node',
  transform: {},
  
  // Test file patterns
  testMatch: [
    '**/tests/**/*.test.js',
    '**/__tests__/**/*.test.js'
  ],
  
  // Coverage collection
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/index.js',      // Exclude entry point
    '!src/config.js',     // Exclude configuration
  ],
  
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  verbose: true,
  testTimeout: 30000,
  detectOpenHandles: true,
  forceExit: true,
};
