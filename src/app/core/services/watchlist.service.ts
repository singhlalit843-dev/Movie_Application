import { Injectable } from '@angular/core';
const KEY = 'watchlist';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  private _ids: number[] = this.load();
  constructor() {}
  private load(): number[] {
    try {
      return JSON.parse(localStorage.getItem(KEY) || '[]');
    } catch {
      return [];
    }
  }
  private save(v: number[]) {
    localStorage.setItem(KEY, JSON.stringify(v));
  }

  toggle(id: number) {
    const idx = this._ids.indexOf(id);
    if (idx >= 0) this._ids.splice(idx, 1);
    else this._ids.push(id);
    this.save(this._ids);
  }
  has(id: number) {
    return this._ids.indexOf(id) >= 0;
  }
  all() {
    return [...this._ids];
  }
}
