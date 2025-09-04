import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WatchlistService } from '../../core/services/watchlist.service';
import { MovieCardComponent } from '../../shared/movie-card/movie-card.component';
import { Movie } from '../../core/models/movie';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.scss',
})
export class WatchlistComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private watchlist: WatchlistService) {}

  ngOnInit() {
    this.movies = this.watchlist.getAll();
  }
}
