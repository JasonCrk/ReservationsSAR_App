import { ApplicationConfig, isDevMode } from '@angular/core'
import { provideRouter } from '@angular/router'

import { provideHttpClient, withFetch } from '@angular/common/http'

import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools'

import { routes } from './app.routes';

import { authReducers } from './features/auth/store/auth.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    provideHttpClient(withFetch()),

    provideStore({ auth: authReducers }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode()
    }),
  ],
}
