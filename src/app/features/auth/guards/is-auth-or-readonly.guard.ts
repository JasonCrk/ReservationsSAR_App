import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { Store } from '@ngrx/store';

import { firstValueFrom } from 'rxjs';

import { selectAuthTokens } from '../store/auth.selectors';
import { AuthActions } from '../store/auth.actions';

import { ApiAuthService } from '../services/api-auth.service';
import { LocalStorageService } from '../services/local-storage.service';

export const isAuthOrReadonlyGuard: CanActivateFn = async (route, state) => {
  const store = inject(Store)

  const authLocalStorage = inject(LocalStorageService)
  const apiAuthService = inject(ApiAuthService)

  const authTokens = await firstValueFrom(store.select(selectAuthTokens))

  if (authTokens.refresh === null || authTokens.access === null) {
    if (authTokens.access !== null)
      apiAuthService.logout(authTokens.access)

    store.dispatch(AuthActions.logout())

    authLocalStorage.removeAccessToken()
    authLocalStorage.removeRefreshToken()

    return true;
  }

  let isInvalidToken = false

  apiAuthService.verifyAccessToken(authTokens.access).subscribe({
    error: () => {
      if (authTokens.refresh === null) {
        store.dispatch(AuthActions.logout())

        authLocalStorage.removeAccessToken()
        authLocalStorage.removeRefreshToken()

        isInvalidToken = true

        return
      }

      apiAuthService.refreshAccessToken(authTokens.refresh).subscribe({
        error: () => {
          store.dispatch(AuthActions.logout())

          authLocalStorage.removeAccessToken()
          authLocalStorage.removeRefreshToken()
        },
        next: ({ accessToken, refreshToken }) => {
          apiAuthService.getUserByAccessToken(accessToken).subscribe({
            next: user => {
              store.dispatch(AuthActions.setUser({ user }))
              store.dispatch(AuthActions.setTokens({
                access: accessToken,
                refresh: refreshToken
              }))

              authLocalStorage.setAccessToken(accessToken)
              authLocalStorage.setRefreshToken(refreshToken)
            }
          })
        }
      })
    },
    next: () => {
      apiAuthService.getUserByAccessToken(authTokens.access!).subscribe({
        next: user => {
          store.dispatch(AuthActions.setUser({ user }))
          store.dispatch(AuthActions.setTokens({
            access: authTokens.access!,
            refresh: authTokens.refresh!
          }))

          authLocalStorage.setAccessToken(authTokens.access!)
          authLocalStorage.setRefreshToken(authTokens.refresh!)
        }
      })
    }
  })

  return true;
};
