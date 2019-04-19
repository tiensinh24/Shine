import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Photo } from '../_interfaces/photo';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) {}

  upload(formData: FormData): Observable<any> {
    const uploadUrl = `${this.baseUrl}api/photo`;

    return this.http
      .post<any>(uploadUrl, formData, {
        reportProgress: true,
        observe: 'events'
      })
      .pipe(
        map(event => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              const progress = Math.round((100 * event.loaded) / event.total);
              return { status: 'progress', message: progress };

            case HttpEventType.Response:
              return event.body;
            default:
              return `Unhandled event: ${event.type}`;
          }
        })
      );
  }
}
