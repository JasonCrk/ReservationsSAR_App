import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';

import { ToastrService } from 'ngx-toastr';

import { AuthActions } from '../../store/auth.actions';

import { LoginRequest } from '../../models';

import { ApiAuthService } from '../../services/api-auth.service';
import { LocalStorageService } from '../../services/local-storage.service';

import { TextFieldComponent } from '../../../../components/text-field/text-field.component';

import { loginForm } from '../../forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextFieldComponent,
    RouterLink
  ],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {

  private readonly _apiAuthService = inject(ApiAuthService)
  private readonly _authLocalStorage = inject(LocalStorageService)
  private readonly _toasts = inject(ToastrService)
  private readonly _store = inject(Store)
  private readonly _router = inject(Router)

  loginForm = loginForm
  isLoading = false

  onLoginSubmit() {
    this.isLoading = true

    if (this.loginForm.valid) {
      this._apiAuthService.login(this.loginForm.value as LoginRequest)
        .subscribe({
          next: ({ accessToken: access, refreshToken: refresh }) => {
            this._store.dispatch(AuthActions.setTokens({ access, refresh }))

            this._authLocalStorage.setAccessToken(access)
            this._authLocalStorage.setRefreshToken(refresh)

            this._router.navigate(['/'])

            this.isLoading = false
          },
          error: (err) => {
            this._toasts.error(err.error?.message ?? err.message, 'Login failed')
            this.isLoading = false
          }
        });
      return
    }

    this.isLoading = false
  }

  get email() {
    return this.loginForm.controls.email
  }

  get password() {
    return this.loginForm.controls.password
  }
}
