import { Routes } from '@angular/router';
import { SearchPageComponent } from './features/search-page/search-page.component';
import { HomeComponent } from './features/home/home.component';
import { MovieDetailComponent } from './features/movie-detail/movie-detail.component';
import { WatchlistComponent } from './features/watchlist/watchlist.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchPageComponent,outlet:"sidebar" },
  { path: 'movie/:id', component: MovieDetailComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path: '**', redirectTo: '' },
];
