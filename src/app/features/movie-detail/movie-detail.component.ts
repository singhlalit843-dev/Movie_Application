import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../core/services/tmdb.service';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../../shared/movie-card/movie-card.component';
import { YearPipe } from '../../shared/pipes/year.pipe';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, YearPipe],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss',
})
export class MovieDetailComponent implements OnInit {
  movie: any = null;
  trailerUrl: SafeResourceUrl | null = null;
  constructor(
    private route: ActivatedRoute,
    public tmdb: TmdbService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;
    this.tmdb.getMovie(id).subscribe((m) => {
      this.movie = m;
      const videos = m.videos?.results || [];
      const trailer = videos.find(
        (v: any) => v.site === 'YouTube' && v.type === 'Trailer'
      );
      if (trailer) {
        const url = `https://www.youtube.com/embed/${trailer.key}`;
        this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      }
    });
  }
 
}
