import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Film } from '../domain/film';


@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private filmUrl: string = 'http://localhost:8080/films';

  constructor(private http: HttpClient) { }

  public findAll(pageIndex: string, sortType: string, filteringCountry: string, filteringGenre: string): Observable<any> {
    const params = new HttpParams()
      .set('page', pageIndex)
      .set('sort', sortType)
      .set('country', filteringCountry)
      .set('genre', filteringGenre);
    return this.http.get<any>(this.filmUrl, { params });
  }

  public findOne(id: number): Observable<Film> {
    return this.http.get<Film>(this.filmUrl + "/" + id);
  }

  public findFilmCast(id: number): Observable<any> {
    return this.http.get<any>(this.filmUrl + "/" + id + "/cast");
  }
}
