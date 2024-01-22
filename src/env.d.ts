// declare var process: {
//   env: {
//     NG_APP_ENV: string;
//     [key: string]: any;
//   };
// };

declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NG_APP_ENV: string;
  }
}
