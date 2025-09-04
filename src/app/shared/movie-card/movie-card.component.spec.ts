import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieCardComponent } from './movie-card.component';
import { TmdbService } from '../../core/services/tmdb.service';
import { WatchlistService } from '../../core/services/watchlist.service';
import { RouterModule } from '@angular/router';

describe('MovieCardComponent', () => {
  let fixture: ComponentFixture<MovieCardComponent>;
  let component: MovieCardComponent;
  let watchlist: jasmine.SpyObj<WatchlistService>;

  beforeEach(() => {
    watchlist = jasmine.createSpyObj('WatchlistService', ['isSaved', 'toggle']);
    TestBed.configureTestingModule({
      imports: [RouterModule],
      declarations: [MovieCardComponent],
      providers: [
        { provide: WatchlistService, useValue: watchlist },
        { provide: TmdbService, useValue: { imageUrl: () => 'placeholder.png' } }
      ]
    });

    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    component.movie = { id: 1, title: 'Inception', release_date: '2010-07-16', vote_average: 8.8, poster_path: '' };
  });

  it('should render movie title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Inception');
  });

  it('should toggle watchlist on button click', () => {
    watchlist.isSaved.and.returnValue(false);
    fixture.detectChanges();
    component.toggleWatchlist(new Event('click'));
    expect(watchlist.toggle).toHaveBeenCalledWith(component.movie);
  });
});
