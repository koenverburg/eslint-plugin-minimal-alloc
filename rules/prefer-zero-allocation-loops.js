module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Prefer zero-allocation loops (for / for...of) over Array.prototype methods used only for side-effects.',
    },
    fixable:  'code',
    messages: {
      noSideEffectLoop:
        'Avoid using {{ method }} only for side-effects. Use a zero-allocation loop (for / for...of) instead.',
    },
    schema: [],
  },

  create(context) {
    const sourceCode = context.getSourceCode()

    function buildLoop(arrText, callback) {
      if ((
        callback.type === 'ArrowFunctionExpression' ||
        callback.type === 'FunctionExpression'
      ) && callback.params.length === 1) {
        const param = sourceCode.getText(callback.params[0])

        if (callback.body.type !== 'BlockStatement') {
          const body = sourceCode.getText(callback.body)
          return `for (const ${param} of ${arrText}) ${body}`
        }

        if (callback.body.type === 'BlockStatement') {
          const body = sourceCode.getText(callback.body)
          return `for (const ${param} of ${arrText}) ${body}`
        }
      }

      return
    }

    return {
      // eslint-disable-next-line max-statements
      CallExpression(node) {
        if (
          node.callee.type === 'MemberExpression' &&
          node.callee.property.type === 'Identifier'
        ) {
          const method = node.callee.property.name
          const arrText = sourceCode.getText(node.callee.object)
          const callback = node.arguments[0]

          const sideEffectMethods = [
            'map',
            'filter',
            'reduce',
            'some',
            'every',
            'flatMap',
          ]

          // --- Case 1: forEach (always side-effect, auto-fixable) ---
          if (method === 'forEach' && node.arguments.length === 1) {
            const replacement = buildLoop(arrText, callback)
            if (replacement) {
              context.report({
                node,
                messageId: 'noSideEffectLoop',
                data:      {method},
                fix(fixer) {
                  return fixer.replaceText(node, replacement)
                },
              })
              return
            }
          }

          // --- Case 2: side-effect methods with unused result ---
          if (
            sideEffectMethods.includes(method) &&
            node.arguments.length === 1 &&
            node.parent.type === 'ExpressionStatement' // result unused
          ) {
            const replacement = buildLoop(arrText, callback)
            if (replacement) {
              context.report({
                node,
                messageId: 'noSideEffectLoop',
                data:      {method},
                fix(fixer) {
                  return fixer.replaceText(node, replacement)
                },
              })
              return
            }
          }

          // ✅ Allowed: transformations where result is used
        }
      },
    }
  },
}
