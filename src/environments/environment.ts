export const environment = {
  production: true,
  stripeKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
  apiUrl: process.env.API_URL || '',
  storeBaseUrl: process.env.STORE_BASE_URL || '',
};
