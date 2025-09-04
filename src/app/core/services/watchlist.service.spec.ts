import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { WatchlistService } from './watchlist.service';
import { Movie } from '../models/movie';

describe('WatchlistService', () => {
  let service: WatchlistService;
  const sample: Movie = {
    id: 1,
    title: 'Inception',
    release_date: '2010-07-16',
    vote_average: 8.8,
    poster_path: ''
  };

  // mock localStorage
  const mockLocalStorage: Record<string, string> = {};
  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) => mockLocalStorage[key] || null);
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      mockLocalStorage[key] = value;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key: string) => {
      delete mockLocalStorage[key];
    });
    spyOn(localStorage, 'clear').and.callFake(() => {
      for (let key in mockLocalStorage) delete mockLocalStorage[key];
    });

    TestBed.configureTestingModule({
      providers: [
        WatchlistService,
        { provide: PLATFORM_ID, useValue: 'browser' } // simulate browser
      ]
    });
    service = TestBed.inject(WatchlistService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with an empty list', () => {
    expect(service.getAll().length).toBe(0);
  });

  it('should add a movie to watchlist', () => {
    service.toggle(sample);
    const list = service.getAll();
    expect(list.length).toBe(1);
    expect(list[0].title).toBe('Inception');
  });

  it('should remove a movie if it already exists', () => {
    service.toggle(sample);
    expect(service.isSaved(1)).toBeTrue();

    service.toggle(sample);
    expect(service.isSaved(1)).toBeFalse();
    expect(service.getAll().length).toBe(0);
  });

  it('should persist across service instances', () => {
    service.toggle(sample);

    // new instance with same PLATFORM_ID
    const newService = TestBed.inject(WatchlistService);
    expect(newService.isSaved(1)).toBeTrue();
  });

  it('should not throw if not in browser', () => {
    // Create a service simulating server
    const serverService = new WatchlistService('server');
    expect(serverService.getAll()).toEqual([]);
    expect(() => serverService.toggle(sample)).not.toThrow();
  });
});
