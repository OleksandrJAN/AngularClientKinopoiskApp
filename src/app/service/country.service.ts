import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private countryUrl: string = 'http://localhost:8080/countries';

  constructor(private http: HttpClient) { }

  public findAll(): Observable<string[]> {
    return this.http.get<string[]>(this.countryUrl);
  }
}
