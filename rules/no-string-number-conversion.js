module.exports = {
  meta: {
    type:     'problem',
    docs:     {description: 'Avoid converting numbers to strings and back'},
    fixable:  'code',
    messages: {
      noStringConv: 'Avoid number → string → number, use Math.trunc or Math.round instead.',
    },
    schema: [],
  },
  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.type === 'MemberExpression' &&
          node.callee.object.name === 'Number' &&
          (node.callee.property.name === 'parseInt' ||
           node.callee.property.name === 'parseFloat') &&
          node.arguments.length &&
          node.arguments[0].type === 'CallExpression' &&
          node.arguments[0].callee.property?.name === 'toString'
        ) {
          const obj = context.getSourceCode().getText(node.arguments[0].callee.object)
          context.report({
            node,
            messageId: 'noStringConv',
            fix(fixer) {
              return fixer.replaceText(node, `Math.trunc(${obj})`)
            },
          })
        }
      },
    }
  },
}
