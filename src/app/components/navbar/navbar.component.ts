import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { Store } from '@ngrx/store';

import { AuthActions } from '../../features/auth/store/auth.actions';
import { selectAuth } from '../../features/auth/store/auth.selectors';

import { ApiAuthService } from '../../features/auth/services/api-auth.service';
import { LocalStorageService } from '../../features/auth/services/local-storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

  private readonly _store = inject(Store)
  private readonly _apiAuthService = inject(ApiAuthService)
  private readonly _authLocalStorage = inject(LocalStorageService)
  private readonly _router = inject(Router)
  private readonly _toast = inject(ToastrService)

  auth$ = this._store.select(selectAuth)

  isLogout = false

  onLogout() {
    this.auth$.subscribe({
      next: ({ access, isAuth }) => {
        if (!isAuth || !access) return

        this.isLogout = true
        this._apiAuthService.logout(access).subscribe({
          next: () => {
            this._store.dispatch(AuthActions.logout())

            this._authLocalStorage.removeAccessToken()
            this._authLocalStorage.removeRefreshToken()

            this._router.navigate([''])

            this.isLogout = false
          },
          error: () => {
            this.isLogout = false
            this._toast.error(
              'Ha ocurrido un problema al intentar cerrar sesión, vuelva a intentarlo más tarde',
              'Cierre de sesión'
            )
          }
        })
      }
    })
  }
}
