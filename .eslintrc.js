const rules = {
    'import/extensions': [
        'error',
        'ignorePackages',
        {
            js: 'never',
            ts: 'never',
        },
    ],
    indent: ['error', 4, { SwitchCase: 1 }],
    'max-len': [
        1,
        120,
        {
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreRegExpLiterals: true,
            ignoreUrls: true,
        },
    ],
    'no-unused-vars': [
        'error',
        {
            argsIgnorePattern: '^context$|^event$',
        },
    ],
    'no-underscore-dangle': ['error', { allow: ['_version'] }],
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
    'prefer-regex-literals': 'off',
    'jest/no-conditional-expect': 'off',
    '@typescript-eslint/no-unused-vars': [
        'error',
        {
            argsIgnorePattern: '^context$|^event$',
        },
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
};

module.exports = {
    root: true,
    settings: {
        'import/core-modules': ['aws-sdk'],
    },
    parserOptions: {
        ecmaVersion: 2022,
    },
    env: {
        es6: true,
        jest: true,
    },
    extends: ['airbnb-base', 'plugin:jest/recommended', 'prettier'],
    overrides: [
        {
            files: ['packages/**/*.ts'],
            parserOptions: {
                ecmaVersion: 2022,
                project: './tsconfig.json',
            },
            plugins: ['jest'],
            extends: ['airbnb-base', 'plugin:jest/recommended', 'prettier'],
            rules,
            settings: {
                'import/resolver': {
                    typescript: {
                        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
                    },
                },
            },
        },
        {
            files: ['packages/**/*.js'],
            parserOptions: {
                ecmaVersion: 2022,
            },
            plugins: ['jest', 'prettier'],
            extends: ['airbnb-base', 'plugin:jest/recommended', 'prettier'],
            rules,
        },
        {
            files: ['**/*.test.js'],
            rules: {
                'no-promise-executor-return': 'off',
            },
        },
    ],
};
