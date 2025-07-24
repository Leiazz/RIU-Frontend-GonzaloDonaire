import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule, MatNavList } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatListModule,
    MatNavList,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
