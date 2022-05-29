// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  niwfyApiUrl: 'http://localhost:5000/api/v1',
  firebaseConfig: {
    apiKey: 'AIzaSyC3O0eczRT6wHPIWcfXipVtBCNDFQ9BSxE',
    authDomain: 'niwfyapp.firebaseapp.com',
    projectId: 'niwfyapp',
    storageBucket: 'niwfyapp.appspot.com',
    messagingSenderId: '431367544160',
    appId: '1:431367544160:web:3e31c4a100b552bf4cd205',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
