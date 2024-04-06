export const environment = {
  production: false,
  stripeKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
  apiUrl: process.env.API_URL || '',
  storeBaseUrl: process.env.STORE_BASE_URL || '',
};
