import { createActionGroup, emptyProps, props } from '@ngrx/store'

import type { AuthUser } from '../models/AuthUser'

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Set tokens': props<{ access: string, refresh: string }>(),
    'Set user': props<{ user: AuthUser }>(),
    'Logout': emptyProps()
  }
})
