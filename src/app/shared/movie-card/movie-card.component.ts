import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../core/models/movie';
import { TmdbService } from '../../core/services/tmdb.service';
import { WatchlistService } from '../../core/services/watchlist.service';
import { CommonModule } from '@angular/common';
import { YearPipe } from '../pipes/year.pipe';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  templateUrl: './movie-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, YearPipe],
})
export class MovieCardComponent implements OnInit {
  @Input() movie!: Movie;
  isInWatchlist = false;

  constructor(
    public tmdb: TmdbService,
    private router: Router,
    private watchlist: WatchlistService
  ) {}

  ngOnInit() {
    this.isInWatchlist = this.watchlist.isSaved(this.movie.id);
  }

  open() {
    this.router.navigate(['/movie', this.movie.id]);
  }

  toggleWatchlist(event: Event) {
    event.stopPropagation(); // prevent navigation
    this.watchlist.toggle(this.movie);
    this.isInWatchlist = !this.isInWatchlist;
  }
}
