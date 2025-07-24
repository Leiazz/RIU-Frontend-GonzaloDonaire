import { Injectable, signal } from '@angular/core';
import { Hero } from '../interfaces/hero';
import { HEROES } from '../data/heroesdb';
import { HeroesMapper } from '../mappers/HeroesMapper';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private _heroes = signal<Hero[]>([]);
  heroes = this._heroes.asReadonly();
  loading = signal<boolean>(false);
  loadingCreateOrEdit = signal<boolean>(false);

  constructor() {
    this.getHeroes();
  }

  getHeroes(): void {
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

  getHeroContainsString(searchString: string): Hero[] {
    return this._heroes().filter((hero) =>
      hero.name.toLowerCase().includes(searchString.toLowerCase())
    );
  }

  updateHero(hero: Hero): void {
    this.loadingCreateOrEdit.set(true);
    setTimeout(() => {
      const heroes = this._heroes();
      const index = heroes.findIndex((h) => h.id === hero.id);
      if (index !== -1) {
        heroes[index] = hero;
        localStorage.setItem('heroes', JSON.stringify(heroes));
        this._heroes.set([...heroes]);
      }
      this.loadingCreateOrEdit.set(false);
    }, 1000);
  }

  deleteHero(id: number): void {
    const heroes = this._heroes();
    const updatedHeroes = heroes.filter((hero) => hero.id !== id);
    localStorage.setItem('heroes', JSON.stringify(updatedHeroes));
    this._heroes.set(updatedHeroes);
  }
}
