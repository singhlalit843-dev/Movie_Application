import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Movie } from '../models/movie';

@Injectable({ providedIn: 'root' })
export class WatchlistService {
  private storageKey = 'watchlist';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  private get list(): Movie[] {
    if (!this.isBrowser) return [];
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  private save(list: Movie[]) {
    if (!this.isBrowser) return;
    localStorage.setItem(this.storageKey, JSON.stringify(list));
  }

  getAll(): Movie[] {
    return this.list;
  }

  isSaved(id: number): boolean {
    return this.list.some((m) => m.id === id);
  }

  toggle(movie: Movie) {
    if (!this.isBrowser) return;
    let current = this.list;
    if (this.isSaved(movie.id)) {
      current = current.filter((m) => m.id !== movie.id);
    } else {
      current.push(movie);
    }
    this.save(current);
  }
}
