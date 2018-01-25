# Reproduction steps

1. `npm install`
2. Copy everything from `failing-libs` directory into `node_modules` directory:

        $ cp -R failing-libs/* node_modules/

3. `./node_modules/.bin/ng serve --aot`
4. Open `app.component.ts` and change `'app'` to `'lib'` (or do any other change).

Observe below error in terminal:

```
ERROR in Error: Debug Failure. False expression: Host should not return a redirect source file from `getSourceFile`
    at tryReuseStructureFromOldProgram (/Users/devoto13/Projects/trash/source-errro/node_modules/typescript/lib/typescript.js:72296:26)
    at Object.createProgram (/Users/devoto13/Projects/trash/source-errro/node_modules/typescript/lib/typescript.js:72004:34)
    at AngularCompilerProgram._createProgramWithBasicStubs (/Users/devoto13/Projects/trash/source-errro/node_modules/@angular/compiler-cli/src/transformers/program.js:435:29)
    at /Users/devoto13/Projects/trash/source-errro/node_modules/@angular/compiler-cli/src/transformers/program.js:143:28
    at <anonymous>
    at process._tickCallback (internal/process/next_tick.js:188:7)
```

### More info

TypeScript 2.5 introduced optimization, where compiler won't load identical libraries multiple times, but instead will load once and replace duplicates with redirect source file. See https://github.com/Microsoft/TypeScript/pull/16274 for more details. The reproduction forces this behavior by adding two fake libs with identical d.ts files.

In real life this mostly happens, when some dependency was not de-duplicated. For example `npm link`-ing a library, which depends on `rxjs` will trigger this error, because there will be two identical instances of `rxjs`, one used directly by application and another one by a sym-linked library.
