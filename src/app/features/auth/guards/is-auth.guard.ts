import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { catchError, firstValueFrom, map, of } from 'rxjs';

import { AuthActions } from '../store/auth.actions';
import { selectAuthTokens } from '../store/auth.selectors';

import { LocalStorageService } from '../services/local-storage.service';
import { ApiAuthService } from '../services/api-auth.service';

export const isAuthGuard: CanActivateFn = async (route, state) => {
  const store = inject(Store)

  const authLocalStorage = inject(LocalStorageService)
  const apiAuthService = inject(ApiAuthService)

  const router = inject(Router)

  const authTokens = await firstValueFrom(store.select(selectAuthTokens))

  if (authTokens.refresh === null || authTokens.access === null) {
    if (authTokens.access !== null)
      apiAuthService.logout(authTokens.access)

    store.dispatch(AuthActions.logout())

    authLocalStorage.removeAccessToken()
    authLocalStorage.removeRefreshToken()

    router.navigate(['/auth/login'])

    return false;
  }


  let currentAccessToken = authTokens.access
  let currentRefreshToken = authTokens.refresh

  return await firstValueFrom(apiAuthService.verifyAccessToken(authTokens.access)
    .pipe(
      map(async () => await firstValueFrom(apiAuthService.getUserByAccessToken(currentAccessToken).pipe(
        map(user => {
          store.dispatch(AuthActions.setUser({ user }))
          store.dispatch(AuthActions.setTokens({
            access: currentAccessToken,
            refresh: currentRefreshToken
          }))

          return true
        }),
        catchError(() => {
          store.dispatch(AuthActions.logout())

          authLocalStorage.removeAccessToken()
          authLocalStorage.removeRefreshToken()

          router.navigate(['/auth/login'])

          return of(false)
        })
      ))),
      catchError(() => {
        if (authTokens.refresh === null) {
          store.dispatch(AuthActions.logout())

          authLocalStorage.removeAccessToken()
          authLocalStorage.removeRefreshToken()

          router.navigate(['/auth/login'])

          return of(false)
        }

        return apiAuthService.refreshAccessToken(authTokens.refresh).pipe(
          map(async ({ accessToken, refreshToken }) => {
            return await firstValueFrom(apiAuthService.getUserByAccessToken(accessToken).pipe(
              map(user => {
                store.dispatch(AuthActions.setUser({ user }))
                store.dispatch(AuthActions.setTokens({
                  access: accessToken,
                  refresh: refreshToken
                }))

                return true
              })
            ))
          }),
          catchError(() => {
            store.dispatch(AuthActions.logout())

            authLocalStorage.removeAccessToken()
            authLocalStorage.removeRefreshToken()

            router.navigate(['/auth/login'])

            return of(false)
          })
        )
      })
    ))
};

