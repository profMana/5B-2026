import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorkersList } from './workers-list/workers-list';

@Component({
  imports: [WorkersList],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  /* protected readonly title = signal('02_workers'); */
}
