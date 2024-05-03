import { createSelector } from '@ngrx/store'

import { AuthInitialState } from './auth.reducers'

export interface AuthState {
  auth: AuthInitialState
}

export const selectAuth = (state: AuthState) => state.auth

export const selectAuthTokens = createSelector(
  selectAuth,
  ({ access, refresh }) => ({ access, refresh })
)

export const selectAuthUser = createSelector(
  selectAuth,
  ({ user }) => ({ user })
)

export const selectIsAuth = createSelector(
  selectAuth,
  ({ isAuth }) => ({ isAuth })
)

