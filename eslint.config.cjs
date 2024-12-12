const globals = require("globals");
const jest = require("eslint-plugin-jest");
const prettier = require("eslint-plugin-prettier");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = [{
    ignores: [
        "**/node_modules/",
        "**/coverage/",
        "**/package.json",
        "**/package-lock.json",
    ],
}, ...compat.extends("plugin:jest/recommended", "prettier"), {
    languageOptions: {
        globals: {
            ...globals.jest,
        },

        ecmaVersion: 2022,
        sourceType: "script",
    },

    settings: {
        "import/core-modules": ["aws-sdk"],
    },
}, ...compat.extends("plugin:jest/recommended", "prettier").map(config => ({
    ...config,
    files: ["src/**/*.ts"],
})), {
    files: ["src/**/*.ts"],

    plugins: {
        jest,
    },

    languageOptions: {
        ecmaVersion: 2022,
        sourceType: "script",

        parserOptions: {
            project: "./tsconfig.json",
        },
    },

    settings: {
        "import/resolver": {
            typescript: {
                alwaysTryTypes: true,
            },
        },
    },

    rules: {
        "import/extensions": ["error", "ignorePackages", {
            js: "never",
            ts: "never",
        }],

        indent: ["error", 4, {
            SwitchCase: 1,
        }],

        "max-len": [1, 120, {
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreRegExpLiterals: true,
            ignoreUrls: true,
        }],

        "no-unused-vars": ["error", {
            argsIgnorePattern: "^context$|^event$",
        }],

        "no-underscore-dangle": ["error", {
            allow: ["_version"],
        }],

        "no-restricted-syntax": "off",
        "no-await-in-loop": "off",
        "prefer-regex-literals": "off",
        "jest/no-conditional-expect": "off",
    },
}, ...compat.extends("plugin:jest/recommended", "prettier").map(config => ({
    ...config,
    files: ["**/*.js"],
})), {
    files: ["**/*.js"],

    plugins: {
        jest,
        prettier,
    },

    languageOptions: {
        ecmaVersion: 2022,
        sourceType: "script",
    },

    rules: {
        indent: ["error", 4, {
            SwitchCase: 1,
        }],

        "max-len": [1, 120, {
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreRegExpLiterals: true,
            ignoreUrls: true,
        }],

        "no-unused-vars": ["error", {
            argsIgnorePattern: "^context$|^event$",
        }],

        "no-underscore-dangle": ["error", {
            allow: ["_version"],
        }],

        "no-restricted-syntax": "off",
        "no-await-in-loop": "off",
        "prefer-regex-literals": "off",
        "jest/no-conditional-expect": "off",



    },
}, {
    files: ["src/**/*.test.js"],

    rules: {
        "no-promise-executor-return": "off",
    },
}];