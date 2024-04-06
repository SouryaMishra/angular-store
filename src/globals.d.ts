declare namespace NodeJS {
  interface ProcessEnv {
    STRIPE_PUBLISHABLE_KEY: string;
    API_URL: string;
    STORE_BASE_URL: string;
  }
}
