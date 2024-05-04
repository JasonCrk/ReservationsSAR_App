import { ApplicationConfig, isDevMode } from '@angular/core'
import { provideRouter } from '@angular/router'

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'
import { provideAnimations } from '@angular/platform-browser/animations'

import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools'

import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';

import { authReducers } from './features/auth/store/auth.reducers';
import { withAuthenticationInterceptorInterceptor } from './interceptors/with-authentication-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    provideHttpClient(
      withFetch(),
      withInterceptors([
        withAuthenticationInterceptorInterceptor
      ])
    ),

    provideStore({ auth: authReducers }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode()
    }),

    provideAnimations(),
    provideToastr({
      positionClass: 'toast-bottom-center',
      timeOut: 2000
    })
  ],
}
