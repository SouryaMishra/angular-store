export const environment = {
  production: true,
  stripeKey: process.env['STRIPE_PUBLISHABLE_KEY'] || '',
  apiUrl: 'http://localhost:4242/checkout',
  storeBaseUrl: 'https://fakestoreapi.com',
};
