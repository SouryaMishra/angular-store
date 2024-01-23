# Store

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.11.

## Development server

Create a `.env` file in the root and add the following key value pairs.

```
STRIPE_PUBLISHABLE_KEY=<your secret key>
API_URL=http://localhost:4242/checkout
STORE_BASE_URL=https://fakestoreapi.com
```

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Fix for `Cannot find name 'process'`

Install type definitions for node with `npm i -D @types/node` and then add `"node"` to the `types` field in `tsconfig.app.json`.

## Fix for `process is not defined`

Create a `polyfills.ts` in `src` and the following:

```
(window as any).process = {
  env: { DEBUG: undefined },
};
```

Add `"src/polyfills.ts"` to `files` array of `tsconfig.app.json` and `tsconfig.spec.json`.

```
// tsconfig.app.json
"files": ["src/main.ts", "src/polyfills.ts"]

// tsconfig.spec.json
"files": ["src/polyfills.ts"]
```

Add `src/polyfills.ts` to `build.options.polyfills` array in `angular.json` which has only one entry `"zone.js"`.

```
"polyfills": ["zone.js", "src/polyfills.ts"]
```

Add `src/polyfills.ts` to `test.options.polyfills` array in `angular.json` which has two entries `"zone.js"` and `"zone.js/testing"`.

```
"polyfills": ["zone.js", "zone.js/testing", "src/polyfills.ts"]
```

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
