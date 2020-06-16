import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Human, HumanSortType } from '../domain/human';


@Injectable({
  providedIn: 'root'
})
export class HumanService {

  private humanUrl: string = 'http://localhost:8080/humans';

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Human[]> {
    return this.http.get<Human[]>(this.humanUrl);
  }

  public findOne(id: number): Observable<Human> {
    return this.http.get<Human>(this.humanUrl + "/" + id);
  }

  public findHumanRoles(id: number, sortingValue: string, filteringGenre?: string): Observable<any> {
    let sort: HumanSortType = HumanSortType[sortingValue]; 
    const params = new HttpParams()
      .set('sort', sort)
      .set('genre', filteringGenre);
    return this.http.get<any>(this.humanUrl + "/" + id + "/roles", { params });
  }

  public findHumanGenres(id: number): Observable<string[]> {
    return this.http.get<string[]>(this.humanUrl + "/" + id + "/genres");
  }
}
