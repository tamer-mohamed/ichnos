module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'jest',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier', // Make sure this is last to override other configs
  ],
  env: {
    node: true,
    jest: true, // For Jest global variables
  },
  rules: {
    // Add any specific rule overrides here
  },
  overrides: [
    {
      files: ['*.js'],
      env: {
        node: true,
        jest: false,
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off', // Allow require in JS files
      }
    }
  ]
};
