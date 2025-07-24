import { Component, signal } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    Header,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('RIU-Frontend-GonzaloDonaire');
}
