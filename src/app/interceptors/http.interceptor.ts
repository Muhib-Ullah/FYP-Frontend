import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { finalize } from 'rxjs';
import { Observable } from 'rxjs';
import { ProgressBarService } from '../services/progressbar.service';

@Injectable()
export class httpInterceptor implements HttpInterceptor{
  constructor(private progressBarService: ProgressBarService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.progressBarService.show();
    return next.handle(req).pipe(
      finalize(() => this.progressBarService.hide())
    );
  }
}