import { Component, inject, signal, effect } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../services/heroes-service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { JsonPipe } from '@angular/common';
import { SeeInUppercase } from '../../directives/see-in-uppercase';

@Component({
  selector: 'app-heroes-form-page',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinner,
    SeeInUppercase,
  ],
  templateUrl: './heroes-form-page.html',
  styleUrl: './heroes-form-page.css',
})
export class HeroesFormPage {
  mode = signal<'create' | 'edit'>('create');
  form: FormGroup = new FormGroup({
    id: new FormControl<number>(0),
    name: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(3)],
    }),
    power: new FormControl<string>('', [Validators.required]),
    universe: new FormControl<string>('', [Validators.required]),
  });
  heroesService = inject(HeroesService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  constructor() {
    effect(() => {
      this.populateForm();
    });
  }

  populateForm(): void {
    const heroId = this.activatedRoute.snapshot.queryParamMap.get('id');
    if (heroId) {
      this.mode.set('edit');
      const hero = this.heroesService.getHeroById(Number(heroId));
      if (hero) {
        this.form.patchValue({ ...hero });
      }
    } else {
      this.mode.set('create');
    }
  }

  onSaveHero() {
    if (this.form.invalid) return;
    if (this.mode() === 'create') {
      this.heroesService.createHero(this.form.value);
    } else {
      this.heroesService.updateHero(this.form.value);
    }
  }

  onCancel(): void {
    this.router.navigateByUrl('/');
  }
}
