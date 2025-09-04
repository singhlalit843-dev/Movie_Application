import { TestBed } from '@angular/core/testing';
import {   HttpTestingController } from '@angular/common/http/testing';
import { TmdbService } from './tmdb.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

describe('TmdbService', () => {
  let service: TmdbService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClient],
      providers: [TmdbService]
    });
    service = TestBed.inject(TmdbService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should fetch movies by mood', () => {
    service.discoverMovieByMood('action').subscribe(res => {
      expect(res.length).toBe(1);
      expect(res[0].title).toBe('Die Hard');
    });

    const req = http.expectOne(`${environment.tmdbBaseUrl}/discover/movie?with_genres=28`);
    expect(req.request.method).toBe('GET');
    req.flush({ results: [{ id: 1, title: 'Die Hard' }] });
  });

  it('should handle API errors', () => {
    service.discoverMovieByMood('action').subscribe({
      next: () => fail('should error'),
      error: (err) => expect(err.status).toBe(401)
    });

    const req = http.expectOne(`${environment.tmdbBaseUrl}/discover/movie?with_genres=28`);
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
  });
});
