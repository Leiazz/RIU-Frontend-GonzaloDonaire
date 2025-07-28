import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { HeroesService } from '../../services/heroes-service';
import { MatButtonModule } from '@angular/material/button';
import { Hero } from '../../interfaces/hero';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDelete } from '../../components/confirm-delete/confirm-delete';

@Component({
  selector: 'app-heroes-page',
  imports: [MatTableModule, MatButtonModule, MatInputModule],
  templateUrl: './heroes-page.html',
  styleUrl: './heroes-page.css',
})
export class HeroesPage {
  readonly dialog = inject(MatDialog);
  heroesService = inject(HeroesService);
  router = inject(Router);
  displayedColumns: string[] = ['id', 'name', 'power', 'universe', 'actions'];

  ngOnDestroy(): void {
    this.heroesService.onChangeSearchString('');
  }

  onEditButton(hero: Hero) {
    this.router.navigateByUrl(`/form?id=${hero.id}`);
  }
  onDeleteButton(hero: Hero) {
    this.dialog.open(ConfirmDelete, {
      data: {
        hero,
        onConfirmAsync: () => this.heroesService.deleteHero(hero.id),
      },
    });
  }
}
