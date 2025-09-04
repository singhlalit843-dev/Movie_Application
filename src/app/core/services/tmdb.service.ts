import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  private http = inject(HttpClient);
  private base = environment.tmdbBaseUrl;

  discoverMovieByMood(mood: 'feel-good' | 'action' | 'mind-benders') {
    const params: any = { sort_by: 'popularity.desc', page: '1' };
    if (mood === 'action') params.with_genres = '28';
    if (mood === 'mind-benders') params.with_genres = '9648,878';
    if (mood === 'feel-good') params.with_keywords = '180547';
    return this.http
      .get<any>(`${this.base}/discover/movie`, { params })
      .pipe(map((r) => r.results || r));
  }

  searchMovie(query: string) {
    if (!query) return new Observable<any[]>((s) => s.next([]));
    return this.http
      .get<any>(`${this.base}/search/multi`, { params: { query } })
      .pipe(map((r) => r.results || []));
  }

  getMovie(id: number) {
    return this.http.get<any>(`${this.base}/movie/${id}`, {
      params: { append_to_response: 'videos,credits,similar' },
    });
  }

  imageUrl(path?: any, size: 'w200' | 'w300' | 'w500' | 'original' = 'w300') {
    if (!path) return 'placeholder-poster.svg';
    return `${environment.tmdbImageBase}${size}${path}`;
  }
}
