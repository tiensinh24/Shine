import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) {}

  deletePhoto(photoId: number) {
    this.http.delete(`${this.baseUrl}api/photo/${photoId}`);
  }
}
