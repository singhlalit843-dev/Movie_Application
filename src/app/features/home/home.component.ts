import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../../core/services/tmdb.service';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../../shared/movie-card/movie-card.component';
import { Movie } from '../../core/models/movie';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  selectedMood: string | null = null;

  constructor(private tmdb: TmdbService) {}
  ngOnInit(): void {
    this.load('action');
  }

  load(mood: 'feel-good' | 'action' | 'mind-benders') {
    this.selectedMood = mood;
    this.tmdb.discoverMovieByMood(mood).subscribe({
      next: (res: Movie[]) => {
        if (res) {
          this.movies = res;
        }
      },
      error: (err: any) => console.error('error', err),
    });
  }
}
