module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow console calls inside loops',
    },
    messages: {
      avoidConsole: 'Avoid console.log in loops',
    },
    schema: [],
  },
  create(context) {
    function isLoop(node) {
      return (
        node.type === 'ForStatement' ||
        node.type === 'WhileStatement' ||
        node.type === 'DoWhileStatement' ||
        node.type === 'ForOfStatement' ||
        node.type === 'ForInStatement'
      )
    }

    // Traverse up AST to check if inside a loop
    function inLoop(node) {
      let parent = node.parent
      while (parent) {
        if (isLoop(parent)) return true
        parent = parent.parent
      }
      return false
    }

    return {
      MemberExpression(node) {
        if (
          node.object.name === 'console' &&
          ['debug', 'error', 'info', 'log', 'warn'].includes(node.property.name)
         && inLoop(node)) {
          context.report({
            node,
            messageId: 'avoidConsole',
          })
        }
      },
    }
  },
}
