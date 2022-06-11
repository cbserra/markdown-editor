module.exports = {
    env: {
        node: true,
        browser: true,
        es2021: true,
    },
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaVersion: 8,
        requireConfigFile: false,
        sourceType: 'module'
    },
    extends: ['plugin:prettier/recommended'],
    rules: {
        'prettier/prettier': 'warn',
    },
    overrides: [
        {
            files: '*.ts*',
            parser: '@typescript-eslint/parser',
            plugins: ['@typescript-eslint'],
            parserOptions: {
                project: 'tsconfig.json',
            },
            extends: [
                'airbnb-typescript/base',
                'eslint:recommended',
                'plugin:import/recommended',
                'plugin:import/typescript',
                'plugin:react/recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/eslint-recommended',
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
                'plugin:prettier/recommended',
            ],
            rules: {
                'prettier/prettier': 'warn',
                'react/react-in-jsx-scope': 'off',
                'import/extensions': 'warn',
                'import/no-extraneous-dependencies': [
                    'error',
                    {
                        devDependencies: false,
                        optionalDependencies: false,
                        peerDependencies: false,
                    },
                ],
            },
        },
    ],
};
