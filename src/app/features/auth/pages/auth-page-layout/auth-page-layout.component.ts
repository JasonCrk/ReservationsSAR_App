import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-page-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <section class="h-screen w-full flex justify-center items-center">
      <router-outlet />
    </section>
  `,
})
export class AuthPageLayoutComponent {
}
