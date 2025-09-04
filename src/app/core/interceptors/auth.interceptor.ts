import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoaderService);

  const isTmdb = req.url.startsWith(environment.tmdbBaseUrl);
  if (!isTmdb) return next(req);

  loader.show();

  const cloned = req.clone({
    setParams: { api_key: environment.tmdbApiKey },
  });
  return next(cloned).pipe(
    finalize(() => {
      if (isTmdb) loader.hide();
    })
  );
};
