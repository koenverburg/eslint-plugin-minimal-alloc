module.exports = {
  meta: {
    type:     'suggestion',
    docs:     {description: 'Avoid unnecessary allocations (like number.toString()) in loops'},
    fixable:  'code',
    messages: {
      noAlloc: 'Avoid .toString() on numbers, use String(x) instead.',
    },
    schema: [],
  },
  create(context) {
    return {
      'CallExpression[callee.property.name="toString"]'(node) {
        if (node.callee.object) {
          const obj = context.getSourceCode().getText(node.callee.object)
          context.report({
            node,
            messageId: 'noAlloc',
            fix(fixer) {
              return fixer.replaceText(node, `String(${obj})`)
            },
          })
        }
      },
    }
  },
}
