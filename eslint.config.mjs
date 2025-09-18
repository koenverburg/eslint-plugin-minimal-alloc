import unicorn from 'eslint-plugin-unicorn'
import parser from '@typescript-eslint/parser'
import stylistic from '@stylistic/eslint-plugin'
import perfectionist from 'eslint-plugin-perfectionist'
import {plugin as ex} from 'eslint-plugin-exception-handling'
import typescriptEslint from '@typescript-eslint/eslint-plugin'

import minimalAlloc from './index.js'

export default [
  {
    ignores: [
      '**/node_modules/**',
    ]
  },
  {
    files:           ['**/*.mjs', '**/*.ts', '**/*.js'],
    languageOptions: {
      parser: parser,
    },
    plugins: {
      ex,
      unicorn,
      minimalAlloc,
      perfectionist,
      '@stylistic':         stylistic,
      '@typescript-eslint': typescriptEslint
    },
    rules: {
      'perfectionist/sort-imports': [
        'error',
        {
          type:            'line-length',
          order:           'asc',
          newlinesBetween: 'always',
          groups:          [
            'type',
            'builtin',
            'external',
            'internal-type',
            ['internal', 'app'],
            ['parent-type', 'sibling-type', 'index-type'],
            ['parent', 'sibling', 'index'],
            'object',
            'unknown',
          ],
          customGroups: {
            value: {
              app: ['^@app/*'],
            },
          },
        },
      ],
      'perfectionist/sort-named-imports': ['error', {
        order: 'asc'
      }],
      'perfectionist/sort-named-exports': ['error', {
        order: 'asc'
      }],

      // "perfectionist/sort-modules": ["warn", {
      //   type: 'custom',
      //   order: 'asc',
      //   fallbackSort: { type: 'unsorted' },
      //   specialCharacters: 'keep',
      //   partitionByComment: false,
      //   partitionByNewLine: false,
      //   newlinesBetween: 'ignore',
      //   groups: [
      //     ['enum', 'export-enum'],
      //     ['interface', 'export-interface', 'type','export-type'],
      //     'declare-function',
      //     'function',
      //     'export-function',
      //     'class',
      //     'declare-class',
      //     'export-class',
      //   ],
      // }],
      'perfectionist/sort-exports':        ['error'],
      'perfectionist/sort-array-includes': ['error'],
      // "perfectionist/sort-objects": ["error", {
      //   order: 'asc',
      //   groups: [
      //     'property',
      //     'member',
      //     'method',
      //     'multiline-member'
      //   ],
      // }],

      // Complexity
      'complexity': ['warn', {'max': 10, 'variant': 'classic'}],

      // Max
      'max-lines':      ['error', {'max': 300, 'skipBlankLines': true, 'skipComments': true}],
      'max-depth':      ['error', 4],
      'max-params':     ['error', 4],
      'max-statements': ['error', 10],

      // No's
      'no-unused-vars':                     'error',
      'no-else-return':                     'error',
      // "ex/no-unhandled": "error",
      'unicorn/no-null':                    'warn',
      'unicorn/no-for-loop':                'error',
      'unicorn/no-lonely-if':               'error',
      'unicorn/no-array-reduce':            'error',
      '@typescript-eslint/no-explicit-any': 'error',
      // '@typescript-eslint/no-misused-promises': 'error',
      // '@typescript-eslint/no-floating-promises': 'error',
      // '@typescript-eslint/no-unnecessary-type-assertion': 'error',

      // Prefers
      'unicorn/better-regex':             'warn',
      'unicorn/prefer-at':                'error',
      'unicorn/prefer-array-find':        'error',
      'unicorn/prefer-array-flat':        'error',
      'unicorn/prefer-array-flat-map':    'error',
      'unicorn/prefer-node-protocol':     'error',
      'unicorn/prefer-number-properties': 'error',

      'unicorn/prefer-spread': 'error',

      // Typescript specific
      '@typescript-eslint/no-unused-vars': ['warn', {
        'varsIgnorePattern': '^_',
        'argsIgnorePattern': '^_'
      }],
      '@typescript-eslint/no-use-before-define': [
        'error',
        {'ignoreTypeReferences': false}
      ],
      // '@typescript-eslint/explicit-function-return-type': ['error'],
      // '@typescript-eslint/prefer-readonly': 'error',
      // '@typescript-eslint/strict-boolean-expressions': 'error',

      // Style
      '@stylistic/semi':                 ['error', 'never'],
      '@stylistic/indent':               ['error', 2],
      '@stylistic/max-len':              ['error', {'code': 240}],
      '@stylistic/quotes':               ['error', 'single'],
      '@stylistic/spaced-comment':       ['error', 'always'],
      '@stylistic/object-curly-spacing': ['error', 'never'],
      '@stylistic/type-generic-spacing': ['error'],
      'lines-between-class-members':     ['error', 'always'],

      // Spacing
      '@stylistic/key-spacing': [
        'error',
        {
          align: {
            on:          'value',
            afterColon:  true,
            beforeColon: false,
          },
        },
      ],

      // minimal Alloc
      'minimalAlloc/prefer-math-trunc':            ['warn'],
      'minimalAlloc/prefer-zero-allocation-loops': ['warn'],

      'minimalAlloc/no-tofixed':                  ['warn'],
      'minimalAlloc/no-unnecessary-allocation':   ['warn'],
      'minimalAlloc/no-string-number-conversion': ['warn']
    },
  },
]
