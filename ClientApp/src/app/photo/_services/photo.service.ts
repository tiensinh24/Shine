import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Photo } from '../_interfaces/photo';
import { PhotoForPerson } from '../_interfaces/photo-for-person';
import { PhotoForProduct } from '../_interfaces/photo-for-product';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) {}

  deletePhoto(photoId: number): Observable<Photo> {
    return this.http.delete<Photo>(`${this.baseUrl}api/photo/${photoId}`);
  }

  setMainPhotoForPerson(photo: PhotoForPerson): Observable<PhotoForPerson> {
    return this.http.put<PhotoForPerson>(`${this.baseUrl}api/photo/person/set-main`, photo);
  }

  setMainPhotoForProduct(photo: PhotoForProduct): Observable<PhotoForProduct> {
    return this.http.put<PhotoForProduct>(`${this.baseUrl}api/photo/product/set-main`, photo);
  }
}
