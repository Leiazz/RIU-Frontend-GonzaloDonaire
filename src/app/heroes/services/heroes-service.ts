import { computed, Injectable, signal } from '@angular/core';
import { Hero } from '../interfaces/hero';
import { HEROES } from '../data/heroesdb';
import { HeroesMapper } from '../mappers/HeroesMapper';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  heroes = signal<Hero[]>([]);
  searchString = signal<string>('');
  heroesFiltered = computed(() => {
    const searchString = this.searchString().toLowerCase();
    if (!searchString) return this.heroes();

    return this.heroes().filter((hero) =>
      hero.name.toLowerCase().includes(searchString)
    );
  });
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
        this.heroes.set(mappedHeroes);
      } else {
        localStorage.setItem('heroes', JSON.stringify(HEROES));
        this.heroes.set(HEROES);
      }
      this.loading.set(false);
    }, 1000);
  }

  getHeroById(id: number): Hero | undefined {
    return this.heroes().find((hero) => hero.id === id);
  }

  onChangeSearchString(searchString: string): void {
    this.searchString.set(searchString);
  }

  updateHero(hero: Hero): void {
    this.loadingCreateOrEdit.set(true);
    setTimeout(() => {
      const heroes = this.heroes();
      const index = heroes.findIndex((h) => h.id === hero.id);
      if (index !== -1) {
        heroes[index] = hero;
        localStorage.setItem('heroes', JSON.stringify(heroes));
        this.heroes.set([...heroes]);
      }
      this.loadingCreateOrEdit.set(false);
    }, 1000);
  }

  deleteHero(id: number): void {
    const heroes = this.heroes();
    const updatedHeroes = heroes.filter((hero) => hero.id !== id);
    localStorage.setItem('heroes', JSON.stringify(updatedHeroes));
    this.heroes.set(updatedHeroes);
  }
}
