import { Component, Input, Pipe } from '@angular/core';
import { Movie } from '../../core/models/movie';
import { TmdbService } from '../../core/services/tmdb.service';
import { WatchlistService } from '../../core/services/watchlist.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { YearPipe } from '../pipes/year.pipe';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule,YearPipe],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  @Input() movie!: Movie;

  constructor(
    public tmdb: TmdbService,
    public watchlist: WatchlistService,
    private router: Router
  ) {}

  open() {
    this.router.navigate(['/movie', this.movie.id]);
  }

  toggle(e: Event) {
    e.stopPropagation();
    this.watchlist.toggle(this.movie.id);
  }
}
