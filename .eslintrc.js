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
        },
        jsdoc: {
            structuredTags: {
                JSX: {type: true}
            },
            definedTags: ['link']
        }
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended'
    ],
    plugins: [
        'prettier',
        'eslint-plugin-jsdoc',
        'eslint-plugin-prefer-arrow',
        'eslint-plugin-react',
        'react-hooks',
        '@typescript-eslint',
        'unicorn'
    ],
    rules: {
        'unicorn/better-regex': 'off',
        'unicorn/catch-error-name': 'off',
        'unicorn/consistent-destructuring': 'error',
        'unicorn/consistent-function-scoping': 'off',
        'unicorn/empty-brace-spaces': 'error',
        'unicorn/error-message': 'error',
        'unicorn/expiring-todo-comments': 'error',
        'unicorn/escape-case': 'error',
        'unicorn/explicit-length-check': 'error',
        'unicorn/filename-case': 'off',
        'unicorn/import-index': 'off',
        'unicorn/import-style': 'off',
        'unicorn/new-for-builtins': 'error',
        'unicorn/no-abusive-eslint-disable': 'error',
        'unicorn/no-array-callback-reference': 'error',
        'unicorn/no-array-for-each': 'error',
        'unicorn/no-array-method-this-argument': 'error',
        'unicorn/no-array-push-push': 'error',
        'unicorn/no-array-reduce': 'error',
        'unicorn/no-await-expression-member': 'off',
        'unicorn/no-console-spaces': 'error',
        'unicorn/no-document-cookie': 'error',
        'unicorn/no-empty-file': 'error',
        'unicorn/no-for-loop': 'error',
        'unicorn/no-hex-escape': 'error',
        'unicorn/no-instanceof-array': 'error',
        'unicorn/no-invalid-remove-event-listener': 'error',
        'unicorn/no-keyword-prefix': 'off',
        'unicorn/no-lonely-if': 'error',
        'no-nested-ternary': 'off',
        'unicorn/no-nested-ternary': 'error',
        'unicorn/no-new-array': 'error',
        'unicorn/no-new-buffer': 'error',
        'unicorn/no-null': 'off',
        'unicorn/no-object-as-default-parameter': 'error',
        'unicorn/no-process-exit': 'error',
        'unicorn/no-static-only-class': 'error',
        'unicorn/no-this-assignment': 'error',
        'unicorn/no-unreadable-array-destructuring': 'error',
        'unicorn/no-unsafe-regex': 'error',
        'unicorn/no-unused-properties': 'error',
        'unicorn/no-useless-fallback-in-spread': 'error',
        'unicorn/no-useless-length-check': 'error',
        'unicorn/no-useless-spread': 'error',
        'unicorn/no-useless-undefined': 'error',
        'unicorn/no-zero-fractions': 'error',
        'unicorn/number-literal-case': 'error',
        'unicorn/numeric-separators-style': 'error',
        'unicorn/prefer-add-event-listener': 'error',
        'unicorn/prefer-array-find': 'error',
        'unicorn/prefer-array-flat': 'error',
        'unicorn/prefer-array-flat-map': 'error',
        'unicorn/prefer-array-index-of': 'error',
        'unicorn/prefer-array-some': 'error',
        'unicorn/prefer-at': 'error',
        'unicorn/prefer-code-point': 'error',
        'unicorn/prefer-date-now': 'error',
        'unicorn/prefer-default-parameters': 'error',
        'unicorn/prefer-dom-node-append': 'error',
        'unicorn/prefer-dom-node-dataset': 'error',
        'unicorn/prefer-dom-node-remove': 'error',
        'unicorn/prefer-dom-node-text-content': 'error',
        'unicorn/prefer-export-from': 'error',
        'unicorn/prefer-includes': 'error',
        'unicorn/prefer-math-trunc': 'error',
        'unicorn/prefer-modern-dom-apis': 'error',
        'unicorn/prefer-module': 'off',
        'unicorn/prefer-negative-index': 'error',
        'unicorn/prefer-node-protocol': 'error',
        'unicorn/prefer-number-properties': 'error',
        'unicorn/prefer-object-from-entries': 'error',
        'unicorn/prefer-object-has-own': 'off',
        'unicorn/prefer-optional-catch-binding': 'error',
        'unicorn/prefer-prototype-methods': 'off',
        'unicorn/prefer-query-selector': 'off',
        'unicorn/prefer-reflect-apply': 'error',
        'unicorn/prefer-regexp-test': 'error',
        'unicorn/prefer-set-has': 'error',
        'unicorn/prefer-spread': 'error',
        'unicorn/prefer-string-replace-all': 'error',
        'unicorn/prefer-string-slice': 'error',
        'unicorn/prefer-string-starts-ends-with': 'error',
        'unicorn/prefer-string-trim-start-end': 'error',
        'unicorn/prefer-switch': 'error',
        'unicorn/prefer-ternary': 'error',
        'unicorn/prefer-top-level-await': 'error',
        'unicorn/prefer-type-error': 'error',
        'unicorn/prevent-abbreviations': [
            'error',
            {
                allowList: {
                    CustomMenuProps: true,
                    IDropdownProps: true,
                    IModalProps: true,
                    IProps: true,
                    ITableProps: true,
                    ITitleProps: true,
                    TProps: true,
                    defaultNoButtonProps: true,
                    defaultYesButtonProps: true,
                    doc: true,
                    dropdownProps: true,
                    idx: true,
                    n: true,
                    noButtonProps: true,
                    props: true,
                    ref: true,
                    tableProps: true,
                    yesButtonProps: true
                }
            }
        ],
        'unicorn/require-array-join-separator': 'error',
        'unicorn/require-number-to-fixed-digits-argument': 'error',
        'unicorn/require-post-message-target-origin': 'error',
        'unicorn/string-content': 'error',
        'unicorn/template-indent': 'error',
        'unicorn/throw-new-error': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        'arrow-parens': ['error', 'always'],
        'brace-style': ['error', '1tbs', {allowSingleLine: true}],
        'comma-dangle': 'error',
        complexity: ['error', {max: 20}],
        'constructor-super': 'error',
        'dot-notation': 'error',
        'eol-last': ['error', 'always'],
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
        'max-classes-per-file': ['error', 1],
        'linebreak-style': 'off',
        'jsdoc/check-alignment': 'error',
        'jsdoc/check-indentation': 'error',
        'jsdoc/newline-after-description': 'off',
        'jsdoc/no-undefined-types': 1,
        'jsdoc/check-line-alignment': 1,
        'jsdoc/check-param-names': 1,
        'jsdoc/check-property-names': 1,
        'jsdoc/check-syntax': 1,
        'jsdoc/check-tag-names': ['error', {definedTags: ['link']}],
        'jsdoc/check-types': 1,
        'jsdoc/check-values': 1,
        'jsdoc/empty-tags': 1,
        'jsdoc/implements-on-classes': 1,
        'jsdoc/multiline-blocks': 1,
        'jsdoc/no-bad-blocks': 1,
        'jsdoc/no-defaults': 1,
        'jsdoc/no-multi-asterisks': 1,
        'jsdoc/require-asterisk-prefix': 1,
        'jsdoc/require-description': 1,
        'jsdoc/require-jsdoc': 1,
        'jsdoc/require-param': 1,
        'jsdoc/require-param-description': 1,
        'jsdoc/require-param-name': 1,
        'jsdoc/require-param-type': 1,
        'jsdoc/require-property': 1,
        'jsdoc/require-property-description': 1,
        'jsdoc/require-property-name': 1,
        'jsdoc/require-property-type': 1,
        'jsdoc/require-returns-check': 1,
        'jsdoc/require-returns-description': 1,
        'jsdoc/require-returns-type': 1,
        'jsdoc/require-throws': 1,
        'jsdoc/require-yields': 1,
        'jsdoc/require-yields-check': 1,
        'jsdoc/tag-lines': 1,
        'jsdoc/valid-types': ['error', {allowEmptyNamepaths: true, checkSeesForNamepaths: false}],
        'jsdoc/check-access': 1,
        'jsdoc/check-examples': 1,
        'jsdoc/match-description': 'off',
        'jsdoc/no-missing-syntax': 'off',
        'jsdoc/no-restricted-syntax': 'off',
        'jsdoc/no-types': 'off',
        'jsdoc/require-description-complete-sentence': 'off',
        'jsdoc/require-example': 'off',
        'jsdoc/require-file-overview': 'off',
        'jsdoc/require-hyphen-before-param-description': 'off',
        'jsdoc/require-returns': 'off',
        'max-len': [
            'error',
            {
                ignoreUrls: true,
                code: 120
            }
        ],
        'new-parens': ['error', 'always'],
        'newline-per-chained-call': ['error', {ignoreChainWithDepth: 2}],
        'no-array-constructor': 'error',
        'no-bitwise': 'error',
        'no-caller': 'error',
        'no-cond-assign': 'error',
        'no-console': 'error',
        'no-debugger': 'error',
        'no-empty': 'error',
        'no-empty-function': 'error',
        'no-eval': 'error',
        'no-extra-semi': 'error',
        'no-fallthrough': 'error',
        'no-implied-eval': 'error',
        'no-invalid-this': 'error',
        'no-irregular-whitespace': 'error',
        'no-multiple-empty-lines': 'error',
        'no-new-wrappers': 'error',
        'no-shadow': 'off',
        'no-throw-literal': 'error',
        'no-trailing-spaces': 'error',
        'no-undef-init': 'error',
        'no-underscore-dangle': [
            'off',
            {
                allow: ['_baseUrl', '_frak', '_apiKey', '_authenticate', '_alert']
            }
        ],
        'no-unsafe-finally': 'error',
        'no-unused-expressions': 'error',
        'no-unused-labels': 'error',
        'no-unused-vars': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
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
        'quote-props': ['error', 'as-needed'],
        quotes: ['error', 'single'],
        'jsx-quotes': ['error', 'prefer-double'],
        radix: ['error', 'as-needed'],
        'react/jsx-curly-spacing': ['error', {when: 'never'}],
        'react/jsx-equals-spacing': 'error',
        'react/jsx-tag-spacing': [
            'error',
            {
                afterOpening: 'allow',
                closingSlash: 'allow'
            }
        ],
        'react/jsx-wrap-multilines': 'error',
        'require-await': 'error',
        'react-hooks/exhaustive-deps': 'error',
        semi: ['error', 'always'],
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
    },
    globals: {
        JSX: true
    }
};
