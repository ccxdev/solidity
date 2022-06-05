module.exports = {
    env: {
        node: true,
    },
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    extends: ["eslint:recommended", "plugin:prettier/recommended", "plugin:mocha/recommended"],
    rules: {
        "prettier/prettier": [
            "error",
            {
                semi: true,
                singleQuote: false,
                printWidth: 100,
                arrowParens: "always",
                endOfLine: "auto",
                tabWidth: 4,
            },
        ],
    },
};
