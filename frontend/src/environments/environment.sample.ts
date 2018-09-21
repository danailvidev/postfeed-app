// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const packageJson = require('../../package.json');

export const environment = {
    production: false,
    versions: packageJson.dependencies,
    backend: {
        baseUrl: 'http://localhost:3000/api/'
    },
    SOCKET_SERVER_URL: 'http://localhost:3000',
    defaultPagination: {
        resultsPerPageOptions: [5, 10, 25, 50, 100],
        defaultResultsPerPage: 5,
        visiblePageLinks: 5
      },
      maxAutocompleteItems : 25,
      maxDropdownItems: 25,
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
