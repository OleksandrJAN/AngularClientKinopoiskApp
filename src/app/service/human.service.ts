import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Human, HumanSortType } from '../domain/human';
import { FilmSortType } from '../domain/film';


@Injectable({
  providedIn: 'root'
})
export class HumanService {

  private humanUrl: string = 'http://localhost:8080/humans';

  constructor(private http: HttpClient) { }

  public findAll(sort: HumanSortType, filteringCareer: string, filteringGenre: string): Observable<Human[]> {
    const params = new HttpParams()
      .set('sort', sort)
      .set('career', filteringCareer)
      .set('genre', filteringGenre);
    return this.http.get<Human[]>(this.humanUrl, { params });
  }

  public findOne(id: number): Observable<Human> {
    return this.http.get<Human>(this.humanUrl + "/" + id);
  }

  public findHumanFilms(id: number, sortType: FilmSortType, filteringCountry: string, filteringGenre: string): Observable<any> {
    const params = new HttpParams()
      .set('sort', sortType)
      .set('country', filteringCountry)
      .set('genre', filteringGenre);
    return this.http.get<any>(this.humanUrl + "/" + id + "/films", { params });
  }

}
