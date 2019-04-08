import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../_interfaces/country';
import { CountrySelect } from '../_interfaces/country-select';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) { }

  getCountryList(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.baseUrl}api/country/`);
  }

  getCountriesSelect(): Observable<CountrySelect[]> {
    return this.http.get<CountrySelect[]>(`${this.baseUrl}api/country/Select`)
  }

  getCountry(id: number): Observable<Country> {
    return this.http.get<Country>(`${this.baseUrl}api/country/${id}`);
  }

  addCountry(country: Country): Observable<Country> {
    return this.http.post<Country>(`${this.baseUrl}api/country/`, country);
  }

  updateCountry(country: Country): Observable<Country> {
    return this.http.put<Country>(`${this.baseUrl}api/country/`, country);
  }

  deleteCountry(id: number): Observable<number> {
    return this.http.delete<number>(`${this.baseUrl}api/country/${id}`);
  }
}
