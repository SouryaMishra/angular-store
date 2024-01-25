export const setupSpies = () => {
  const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);
  const environmentSpy = jasmine.createSpyObj('EnvironmentService', [
    'getConfig',
  ]);
  const stripeSpy = jasmine.createSpyObj('SpriteService', ['checkout']);

  environmentSpy.getConfig.and.returnValue({
    production: false,
    stripeKey: 'sk123',
    apiUrl: 'api_url',
    storeBaseUrl: 'store_url',
  });

  return { snackBarSpy, httpClientSpy, environmentSpy, stripeSpy };
};
