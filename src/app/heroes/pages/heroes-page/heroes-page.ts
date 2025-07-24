import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { HeroesService } from '../../services/heroes-service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-heroes-page',
  imports: [MatTableModule, MatProgressSpinner],
  templateUrl: './heroes-page.html',
  styleUrl: './heroes-page.css',
})
export class HeroesPage {
  heroesService = inject(HeroesService);

  displayedColumns: string[] = ['id', 'name', 'power', 'universe', 'actions'];

  constructor() {
    this.heroesService.getHeroes();
  }
}
