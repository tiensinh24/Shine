import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Photo } from '../../intefaces/public/photo';
import { PhotoForPerson } from '../../intefaces/public/photo-for-person';
import { PhotoForProduct } from '../../intefaces/public/photo-for-product';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) {}

  getPhotosForPerson(personId: number): Observable<PhotoForPerson[]> {
    return this.http.get<PhotoForPerson[]>(`${this.baseUrl}api/photo/person/${personId}`);
  }

  getPhotosForProduct(productId: number): Observable<PhotoForProduct[]> {
    return this.http.get<PhotoForProduct[]>(`${this.baseUrl}api/photo/product/${productId}`);
  }

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
