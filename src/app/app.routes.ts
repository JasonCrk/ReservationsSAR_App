import { Routes } from '@angular/router'

import { HomePageComponent } from './pages/home-page/home-page.component'

import { AuthPageLayoutComponent } from './features/auth/pages/auth-page-layout/auth-page-layout.component'
import { LoginPageComponent } from './features/auth/pages/login-page/login-page.component'
import { RegisterPageComponent } from './features/auth/pages/register-page/register-page.component'

import { EstablishmentDetailsPageComponent } from './features/establishment/pages/establishment-details-page/establishment-details-page.component'

import { EstablishmentManagerPageComponent } from './features/reservation/pages/establishment-manager-page/establishment-manager-page.component'

import { isAuthOrReadonlyGuard } from './features/auth/guards/is-auth-or-readonly.guard'
import { isAuthGuard } from './features/auth/guards/is-auth.guard'
import { notAuthGuard } from './features/auth/guards/not-auth.guard'

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [isAuthOrReadonlyGuard]
  },
  {
    path: 'establishments/:establishmentId',
    component: EstablishmentDetailsPageComponent,
    canActivate: [isAuthOrReadonlyGuard]
  },
  {
    path: 'r/manager',
    component: EstablishmentManagerPageComponent,
    canActivate: [isAuthGuard]
  },
  {
    path: 'auth',
    component: AuthPageLayoutComponent,
    canActivate: [notAuthGuard],
    children: [
      {
        path: 'login',
        component: LoginPageComponent
      },
      {
        path: 'register',
        component: RegisterPageComponent
      }
    ]
  }
]
