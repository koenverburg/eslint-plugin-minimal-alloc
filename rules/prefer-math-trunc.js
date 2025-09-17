module.exports = {
  meta: {
    type:     'suggestion',
    docs:     {description: 'Use Math.trunc instead of parseInt for numbers'},
    fixable:  'code',
    messages: {
      preferTrunc: 'Use Math.trunc() instead of parseInt() for numbers.',
    },
    schema: [],
  },
  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.type === 'MemberExpression' &&
            node.callee.object.name === 'Number' &&
            node.callee.property.name === 'parseInt') {
          context.report({
            node,
            messageId: 'preferTrunc',
            fix(fixer) {
              const arg = context.getSourceCode().getText(node.arguments[0])
              return fixer.replaceText(node, `Math.trunc(${arg})`)
            },
          })
        }
      },
    }
  },
}
