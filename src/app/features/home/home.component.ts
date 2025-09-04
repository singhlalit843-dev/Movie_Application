import { Component } from '@angular/core';
import { TmdbService } from '../../core/services/tmdb.service';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from "../../shared/movie-card/movie-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
movies: any[] = [];
  loading = false;
  constructor(private tmdb: TmdbService){}
  load(mood: 'feel-good'|'action'|'mind-benders') {
    this.loading = true;
    this.tmdb.discoverByMood(mood).subscribe(r => { this.movies = r; this.loading = false; }, _=> this.loading=false);
  }
}
