import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { HeroesService } from '../../services/heroes-service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { Hero } from '../../interfaces/hero';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes-page',
  imports: [MatTableModule, MatProgressSpinner, MatButtonModule],
  templateUrl: './heroes-page.html',
  styleUrl: './heroes-page.css',
})
export class HeroesPage {
  heroesService = inject(HeroesService);
  router = inject(Router);
  displayedColumns: string[] = ['id', 'name', 'power', 'universe', 'actions'];

  onEditButton(hero: Hero) {
    this.router.navigateByUrl(`/form?id=${hero.id}`);
  }
  onAddButton() {
    this.router.navigateByUrl('/form');
  }
}
