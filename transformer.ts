import * as ts from 'typescript';

export function transformer<T extends ts.Node>(): ts.TransformerFactory<T> {
  return context => {
    const visit: ts.Visitor = node => {
      if (ts.isIdentifier(node) && node.text === 'foo') {
        return ts.createIdentifier('foo');
      }
      return ts.visitEachChild(node, child => visit(child), context);
    };

    return node => ts.visitNode(node, visit);
  };
}