import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Genre } from '../domain/genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private genreUrl: string = 'http://localhost:8080/genres';

  constructor(private http: HttpClient) { }

  public findAll(): Observable<string[]> {
    return this.http.get<string[]>(this.genreUrl);
  }
}
