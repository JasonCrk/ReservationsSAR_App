import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { firstValueFrom } from 'rxjs';

import { selectAuth } from '../store/auth.selectors';

export const notAuthGuard: CanActivateFn = async (route, state) => {
  const store = inject(Store)
  const router = inject(Router)

  const { access, refresh, isAuth } = await firstValueFrom(store.select(selectAuth))

  if (access !== null || refresh !== null || isAuth) {
    router.navigate(['/'])
    return false
  }

  return true
};
