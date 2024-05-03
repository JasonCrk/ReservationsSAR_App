import { createReducer, on } from "@ngrx/store"

import type { AuthUser } from "../models/AuthUser"

import { AuthActions } from "./auth.actions"

export type AuthInitialState = {
  access: string | null
  refresh: string | null
  user: AuthUser | null
  isAuth: boolean
}

export const initialState: AuthInitialState = {
  isAuth: false,
  // Se muy bien que esta no es la mejor manera de almácen los tokens
  refresh: localStorage.getItem('refreshToken'),
  access: localStorage.getItem('accessToken'),
  user: null
}

export const authReducers = createReducer(
  initialState,
  on(AuthActions.setTokens, (state, props) => ({
    ...state,
    ...props,
    isAuth: true
  })),
  on(AuthActions.setUser, (state, { user }) => ({
    ...state,
    user
  })),
  on(AuthActions.logout, () => ({
    access: null,
    refresh: null,
    user: null,
    isAuth: false
  }))
)
