import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/auth.actions';

import { RegisterUserRequest } from '../../models';

import { ApiAuthService } from '../../services/api-auth.service';

import { TextFieldComponent } from '../../../../components/text-field/text-field.component';

import { registerUserForm } from '../../forms';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextFieldComponent,
    RouterLink
  ],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  private readonly _apiAuthService = inject(ApiAuthService)
  private readonly _authLocalStorage = inject(LocalStorageService)
  private readonly _toasts= inject(ToastrService)
  private readonly _store = inject(Store)
  private readonly _router = inject(Router)

  registerForm = registerUserForm
  isLoading = false

  onRegisterSubmit() {
    this.isLoading = true

    if (this.registerForm.invalid) return;

    this._apiAuthService.registerUser(
      this.registerForm.value as RegisterUserRequest
    )
      .subscribe({
        next: ({ accessToken: access, refreshToken: refresh }) => {
          this._store.dispatch(AuthActions.setTokens({ access, refresh }))

          this._authLocalStorage.setAccessToken(access)
          this._authLocalStorage.setRefreshToken(refresh)

          this._router.navigate(['/'])

          this.isLoading = false
        },
        error: (err) => {
          const errorMessage = err.error?.errors[0] ?? err.error?.message ?? err.message
          this._toasts.error(errorMessage, 'Register user failed')
          this.isLoading = false
        }
      })
  }

  get firstName() {
    return this.registerForm.controls.firstName
  }

  get lastName() {
    return this.registerForm.controls.lastName
  }

  get birthdate() {
    return this.registerForm.controls.birthdate
  }

  get phoneNumber() {
    return this.registerForm.controls.phoneNumber
  }

  get email() {
    return this.registerForm.controls.email
  }

  get password() {
    return this.registerForm.controls.password
  }
}

