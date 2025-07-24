import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroes-form-page',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './heroes-form-page.html',
  styleUrl: './heroes-form-page.css',
})
export class HeroesFormPage {
  form: FormGroup = new FormGroup({
    id: new FormControl<number>(0),
    name: new FormControl<string>(''),
    power: new FormControl<string>(''),
    universe: new FormControl<string>(''),
  });

  constructor(activatedRoute: ActivatedRoute) {
    const heroId = activatedRoute.snapshot.queryParamMap.get('id');
    if (heroId) {
      console.log({ heroId });
    }
  }
}
