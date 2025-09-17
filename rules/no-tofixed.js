module.exports = {
  meta: {
    type:     'problem',
    docs:     {description: 'Avoid using .toFixed(), use Math.round with factor instead'},
    fixable:  'code',
    messages: {
      noToFixed: '.toFixed() allocates strings, use Math.round(x * 1eN) / 1eN instead.',
    },
    schema: [],
  },
  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.type === 'MemberExpression' &&
            node.callee.property.name === 'toFixed') {
          context.report({
            node,
            messageId: 'noToFixed',
            fix(fixer) {
              const arg = node.arguments[0] ? context.getSourceCode().getText(node.arguments[0]) : '0'
              const obj = context.getSourceCode().getText(node.callee.object)
              return fixer.replaceText(node, `Math.round(${obj} * 10**${arg}) / 10**${arg}`)
            },
          })
        }
      },
    }
  },
}
