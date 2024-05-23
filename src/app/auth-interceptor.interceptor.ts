import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthHandlerService } from './auth-handler.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authHandler = inject(AuthHandlerService);
  const authToken = authHandler.getToken();

  const authReq = req.clone({
    setHeaders: {
      Authorization: `bearer ${authToken}`,
    },
  });

  return next(authReq).pipe(
    catchError((err) => {
      if (
        err instanceof HttpErrorResponse &&
        err.status == 401 &&
        authHandler.isLoggedIn()
      ) {
        authHandler.refreshToken();
      }
      return throwError(err);
    })
  );
};
