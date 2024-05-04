import { inject } from '@angular/core';
import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { selectAuth } from '../features/auth/store/auth.selectors';

export const CTX_REQUIRE_AUTH = new HttpContextToken<boolean>(() => false)

export const withAuthenticationInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  let cloneReq = req

  if (req.context.get(CTX_REQUIRE_AUTH)) {
    const store = inject(Store)
    const router = inject(Router)

    store.select(selectAuth).subscribe({
      next: ({ isAuth, access }) => {
        if (!isAuth || !access) {
          router.navigate(['/auth/login'])
          return
        }

        cloneReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${access}`
          }
        })
      }
    })
  }

  return next(cloneReq);
};
