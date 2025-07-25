import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { HeroesService } from '../../services/heroes-service';
import { Hero } from '../../interfaces/hero';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-confirm-delete',
  imports: [MatDialogModule, MatButtonModule, MatProgressSpinnerModule],
  template: `
    <h2 mat-dialog-title>Eliminar Héroe</h2>
    <mat-dialog-content>
      ¿Estás seguro de que deseas eliminar este héroe?
    </mat-dialog-content>
    <mat-dialog-actions>
      <button
        mat-button
        [disabled]="heroesService.loadingDelete()"
        mat-dialog-close
      >
        Cancelar
      </button>
      <button
        mat-button
        [disabled]="heroesService.loadingDelete()"
        (click)="onConfirmDelete()"
        cdkFocusInitial
      >
        @if (heroesService.loadingDelete()) {
        <mat-spinner [diameter]="20" color="white"></mat-spinner>
        }@else {Si, eliminar}
      </button>
    </mat-dialog-actions>
  `,
})
export class ConfirmDelete {
  readonly dialogRef = inject(MatDialogRef<ConfirmDelete>);
  data = inject<{ hero: Hero }>(MAT_DIALOG_DATA);

  heroesService = inject(HeroesService);

  onConfirmDelete() {
    this.heroesService.deleteHero(this.data.hero.id).then(() => {
      this.dialogRef.close(true);
    });
  }
}
