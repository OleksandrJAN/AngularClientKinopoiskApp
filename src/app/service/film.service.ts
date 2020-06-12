import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Film } from '../domain/film';


@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private filmUrl: string = 'http://localhost:8080/films';

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Film[]> {
    return this.http.get<Film[]>(this.filmUrl);
  }

  public findOne(id: number): Observable<Film> {
    return this.http.get<Film>(this.filmUrl + "/" + id);
  }

  public findFilmCast(id: number): Observable<any> {
    return this.http.get<any>(this.filmUrl + "/" + id + "/cast");
  }
}
