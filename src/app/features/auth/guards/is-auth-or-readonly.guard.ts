import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { Store } from '@ngrx/store';

import { catchError, firstValueFrom, map, of } from 'rxjs';

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

  let currentAccessToken = authTokens.access
  let currentRefreshToken = authTokens.refresh

  let isInvalidToken = false

  apiAuthService.verifyAccessToken(authTokens.access).pipe(
    catchError(() => {
      if (authTokens.refresh === null) {

        store.dispatch(AuthActions.logout())

        authLocalStorage.removeAccessToken()
        authLocalStorage.removeRefreshToken()

        isInvalidToken = true

        return of()
      }

      apiAuthService.refreshAccessToken(authTokens.refresh).pipe(
        map(({ accessToken, refreshToken }) => {
          currentAccessToken = accessToken
          currentRefreshToken = refreshToken
        })
      )

      return of()
    })
  )

  if (isInvalidToken) return true

  apiAuthService.getUserByAccessToken(currentAccessToken).subscribe({
    next: user => {
      store.dispatch(AuthActions.setUser({ user }))
      store.dispatch(AuthActions.setTokens({
        access: currentAccessToken,
        refresh: currentRefreshToken
      }))
    }
  })

  return true;
};
