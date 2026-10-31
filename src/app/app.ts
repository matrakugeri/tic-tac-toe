import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Setup } from './pages/setup/setup';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('tic-tac-toe');
}
