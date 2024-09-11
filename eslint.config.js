const eslintConfigPrettier = require("eslint-config-prettier");

module.exports = [
    {
        ignores: ["node_modules/**"], // Ignore node_modules
        languageOptions: {
            ecmaVersion: "latest", // Use the latest ECMAScript version
            sourceType: "script", // Set 'script' for CommonJS (use 'module' for ES Modules)
            globals: {
                // Define global variables for your environment
                require: "readonly", // CommonJS global
                module: "readonly", // CommonJS global
                __dirname: "readonly", // Node.js global
                process: "readonly", // Node.js global
                console: "readonly", // Node.js global
                // exports: "readonly", // Node.js global
            },
        },
        rules: {
            // best practices
            eqeqeq: "error",
            curly: "error",
            "no-eval": "error",

            // code quality & error prevention
            "no-unused-vars": [
                "warn",
                {
                    varsIgnorePattern: "^_",
                    argsIgnorePattern: "^_",
                },
            ], // Example: Warn on unused variables
            "no-console": "warn", // Example: Allow console statements
            // "no-undef": "error",
            "no-var": "error",
            "prefer-const": "error",
            "arrow-spacing": ["error", { before: true, after: true }],
            "no-path-concat": "error",

            // complexity & maintainability:
            "max-lines": ["error", { max: 500 }], // Enforce a maximum number of lines in a file.
        },
    },
    eslintConfigPrettier,
];
