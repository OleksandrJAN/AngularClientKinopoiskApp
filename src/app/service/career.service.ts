import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Career } from '../domain/career';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  private careerUrl: string = 'http://localhost:8080/careers';

  constructor(private http: HttpClient) { }

  public findAll(): Observable<string[]> {
    return this.http.get<string[]>(this.careerUrl);
  }
}
