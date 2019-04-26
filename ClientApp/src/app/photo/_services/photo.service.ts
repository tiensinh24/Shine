import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Photo } from '../_interfaces/photo';
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

  updatePhoto(photo: Photo): Observable<Photo> {
    return this.http.put<Photo>(`${this.baseUrl}api/photo/person`, photo);
  }

  setMainPhotoForPerson(photo: PhotoForPerson): Observable<PhotoForPerson> {
    return this.http.put<PhotoForPerson>(`${this.baseUrl}api/photo/person/set-main`, photo);
  }
}
