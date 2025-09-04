import { Component } from '@angular/core';
import { TmdbService } from '../../core/services/tmdb.service';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../../shared/movie-card/movie-card.component';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { Movie } from '../../core/models/movie';
import { Person } from '../../core/models/person';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, SearchBarComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  movies: Movie[] = [];
  people: Person[] = [];
  loading = false;
  query = '';

  constructor(public tmdb: TmdbService) {}

  onTerm(term: string) {
    this.query = term.trim();
    if (!this.query || this.query.length < 2) {
      this.movies = [];
      this.people = [];
      return;
    }

    this.loading = true;
    this.tmdb.searchMovie(this.query).subscribe({
      next: (res: any[]) => {
        this.movies = res.filter((r) => r.media_type === 'movie');
        this.people = res.filter((r) => r.media_type === 'person');
        this.loading = false;
      },

      error: (err: any) => (this.loading = false),
    });
  }

  getTitle(p: any): string {
    if (!p?.known_for) return '';
    return p.known_for.map((k: any) => k.title || k.name).join(', ');
  }
}
