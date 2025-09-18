module.exports = {
  rules: {
    'prefer-math-trunc':            require('./rules/prefer-math-trunc'),
    'prefer-zero-allocation-loops': require('./rules/prefer-zero-allocation-loops'),

    'no-tofixed':                  require('./rules/no-tofixed'),
    'no-unnecessary-allocation':   require('./rules/no-unnecessary-allocation'),
    'no-string-number-conversion': require('./rules/no-string-number-conversion'),
  },
}
