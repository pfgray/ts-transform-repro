import * as ts from 'typescript';
import { syntaxKindtoName } from './syntaxKind';

export function transformer<T extends ts.Node>(): ts.TransformerFactory<T> {
  return context => {
    const visit: ts.Visitor = node => {
      if(ts.isCallExpression(node)) {
        console.log(node.getText())
        const expr = node.expression
        if(ts.isPropertyAccessExpression(expr)) {
          const leftExpr = expr.expression

          if(ts.isIdentifier(leftExpr)) {
            console.log()
            console.log('  name is:', expr.name.getText(), 'identifier')

            console.log('  expression is:', expr.expression.getText(), syntaxKindtoName(expr.expression.kind))

            if(expr.name.text === 't' && leftExpr.text === 'foo') {
              // replace, using leftExpr
              return ts.createPropertyAccess(leftExpr, 'five')
            }
          }
          
        }
      }
      
      
      // if (ts.isIdentifier(node) && node.text === 'foo') {
      //   // replace
      //   return node; //ts.createIdentifier('foo');
      // }
      return ts.visitEachChild(node, child => visit(child), context);
    };

    return node => ts.visitNode(node, visit);
  };
}