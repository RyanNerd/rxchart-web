module.exports = {
    env: {
        browser: true,
        node: true
    },
    parser: '@typescript-eslint/parser',
    root: true,
    parserOptions: {
        ecmaVersion: 13,
        requireConfigFile: false,
        ecmaFeatures: {
            jsx: true
        },
        sourceType: 'module'
    },
    settings: {
        'import/resolver': {
            typescript: {}
        },
        react: {
            version: 'detect'
        }
    },
    extends: [
        'prettier',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended'
    ],
    plugins: [
        'eslint-plugin-jsdoc',
        'eslint-plugin-prefer-arrow',
        'eslint-plugin-react',
        'react',
        'react-hooks',
        '@typescript-eslint'
    ],
    rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'arrow-parens': ['off', 'always'],
        'brace-style': ['off', 'off'],
        'comma-dangle': 'error',
        complexity: 'off',
        'constructor-super': 'error',
        'dot-notation': 'error',
        'eol-last': 'off',
        eqeqeq: ['error', 'smart'],
        'guard-for-in': 'error',
        'id-denylist': [
            'error',
            'any',
            'Number',
            'number',
            'String',
            'string',
            'Boolean',
            'boolean',
            'Undefined',
            'undefined'
        ],
        'id-match': 'error',
        indent: 'off',
        'jsdoc/check-alignment': 'error',
        'jsdoc/check-indentation': 'error',
        'jsdoc/newline-after-description': 'off',
        'linebreak-style': 'off',
        'max-classes-per-file': ['error', 1],
        'max-len': [
            'error',
            {
                code: 120
            }
        ],
        'new-parens': 'off',
        'newline-per-chained-call': 'off',
        'no-array-constructor': 'off',
        'no-bitwise': 'error',
        'no-caller': 'error',
        'no-cond-assign': 'error',
        'no-console': 'off',
        'no-debugger': 'error',
        'no-empty': 'error',
        'no-empty-function': 'error',
        'no-eval': 'error',
        'no-extra-semi': 'off',
        'no-fallthrough': 'off',
        'no-implied-eval': 'off',
        'no-invalid-this': 'off',
        'no-irregular-whitespace': 'error',
        'no-multiple-empty-lines': 'error',
        'no-new-wrappers': 'error',
        'no-shadow': 'off',
        'no-throw-literal': 'error',
        'no-trailing-spaces': 'off',
        'no-undef-init': 'error',
        'no-underscore-dangle': 'off',
        'no-unsafe-finally': 'error',
        'no-unused-expressions': 'error',
        'no-unused-labels': 'error',
        'no-unused-vars': 'off',
        'no-use-before-define': 'off',
        'no-var': 'error',
        'object-shorthand': 'error',
        'one-var': ['error', 'never'],
        'padded-blocks': [
            'off',
            {
                blocks: 'never'
            },
            {
                allowSingleLineBlocks: false
            }
        ],
        'prefer-arrow/prefer-arrow-functions': 'error',
        'prefer-const': 'error',
        'quote-props': 'off',
        quotes: 'off',
        radix: 'off',
        'react/jsx-curly-spacing': 'off',
        'react/jsx-equals-spacing': 'off',
        'react/jsx-tag-spacing': [
            'off',
            {
                afterOpening: 'allow',
                closingSlash: 'allow'
            }
        ],
        'react/jsx-wrap-multilines': 'off',
        'require-await': 'off',
        'react-hooks/exhaustive-deps': 'error',
        semi: 'off',
        'space-before-function-paren': 'off',
        'space-in-parens': ['off', 'never'],
        'spaced-comment': [
            'error',
            'always',
            {
                markers: ['/']
            }
        ],
        'use-isnan': 'error',
        'valid-typeof': 'off'
    }
};
