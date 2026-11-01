import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-main-layout',
  styles:[`
  .main-layout {
  min-height: 100vh;
  padding: 40px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-background);
}
@media (max-width: 520px) {
  .main-layout {
    padding: 24px 16px;
    align-items: flex-start;
  }
}
`],
  template:`
  <main class="main-layout">
    <router-outlet/>
</main>
`
})
export class MainLayout {}
