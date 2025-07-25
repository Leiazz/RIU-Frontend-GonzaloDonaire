import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete',
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Eliminar Héroe</h2>
    <mat-dialog-content>
      ¿Estás seguro de que deseas eliminar este héroe?
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>
        Eliminar
      </button>
    </mat-dialog-actions>
  `,
})
export class ConfirmDelete {
  readonly dialogRef = inject(MatDialogRef<ConfirmDelete>);
}
