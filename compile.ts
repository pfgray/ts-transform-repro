import * as ts from 'typescript';
import { transformer } from './transformer';

const program = ts.createProgram(['./test.ts'], {
  outDir: 'lib/',
  target: ts.ScriptTarget.ES2016,
  module: ts.ModuleKind.CommonJS,
  // works with:    module: ts.ModuleKind.ESNext
});
const source = program.getSourceFile('./test.ts');

const emitResult = program.emit(
  undefined,
  undefined,
  undefined,
  undefined,
  {
    before: [
      transformer()
    ]
  }
)

console.log('emmitted: ', emitResult.emittedFiles)



// Couldn't derive instance for type: User,
// No Type<Date> found for path:
// User
//  └─image
//    └─src

