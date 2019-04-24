import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PhotoForPerson } from '../_interfaces/photo-for-person';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) {}

  deletePhoto(photoId: number): Observable<PhotoForPerson> {
    return this.http.delete<PhotoForPerson>(`${this.baseUrl}api/photo/${photoId}`);
  }

  updatePhoto(photo: PhotoForPerson): Observable<PhotoForPerson> {
    return this.http.put<PhotoForPerson>(`${this.baseUrl}api/photo`, photo);
  }
}
