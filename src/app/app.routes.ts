import { Routes } from '@angular/router';
import { HeroesPage } from './heroes/pages/heroes-page/heroes-page';
import { HeroesFormPage } from './heroes/pages/heroes-form-page/heroes-form-page';

export const routes: Routes = [
  { path: '', component: HeroesPage },
  { path: 'form', component: HeroesFormPage },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
