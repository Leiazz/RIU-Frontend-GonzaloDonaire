import { Injectable, signal } from '@angular/core';
import { Hero } from '../interfaces/hero';
import { HEROES } from '../data/heroesdb';
import { HeroesMapper } from '../mappers/HeroesMapper';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private _heroes = signal<Hero[]>([]);
  loading = signal<boolean>(false);

  getHeroes() {
    this.loading.set(true);
    setTimeout(() => {
      const heroesFromStorage = JSON.parse(
        localStorage.getItem('heroes') || '[]'
      );
      if (heroesFromStorage.length > 0) {
        const mappedHeroes = HeroesMapper(heroesFromStorage);
        this._heroes.set(mappedHeroes);
      } else {
        localStorage.setItem('heroes', JSON.stringify(HEROES));
        this._heroes.set(HEROES);
      }
      this.loading.set(false);
    }, 1000);
  }

  getHeroById(id: number): Hero | undefined {
    return this._heroes().find((hero) => hero.id === id);
  }
}
