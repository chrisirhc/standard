'use strict';

module.exports = noFunctionBind;

function noFunctionBind(context) {
    return {
        'CallExpression': function callExpression(node) {
            if (node.callee.type === 'MemberExpression' &&
                node.callee.property.name === 'bind'
            ) {
                context.report(node, 'Function .bind() is banned');
            }
        }
    };
}
