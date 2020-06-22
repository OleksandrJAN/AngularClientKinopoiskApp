import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HumanService } from '../service/human.service';
import { Human } from '../domain/human';
import { FilmSortType } from '../domain/film';


@Component({
  selector: 'app-human-page',
  templateUrl: './human-page.component.html',
  styleUrls: ['./human-page.component.css']
})
export class HumanPageComponent implements OnInit {

  private humanId: number;
  human: Human = new Human();
  humanRoles: any;

  filmsSortingValues: string[] = Object.keys(FilmSortType);
  sortingValue: string = this.filmsSortingValues[0];

  humanFilmsCountries: string[] = ['Все страны'];
  filteringCountry: string = this.humanFilmsCountries[0];
  
  humanFilmsGenres: string[] = ['Все жанры'];
  filteringGenre: string = this.humanFilmsGenres[0];

  constructor(
    private humanService: HumanService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getHuman();
  }

  getHuman(): void {
    this.activatedRoute.paramMap.subscribe(
      params => {
        const id: number = +params.get('id');
        this.humanId = id;
        this.getHumanInfo();
        this.getHumanFilmsInfo();
      }
    );
  }

  getHumanInfo(): void {
    this.humanService.findOne(this.humanId).subscribe(
      (human: Human) => this.human = human,
      (error: any) => console.log(error)
    );
  }

  getHumanFilmsInfo(): void {
    this.getHumanFilms();
    this.getHumanFilmsCountries();
    this.getHumanFilmsGenres();
  }

  getHumanFilms(): void {
    let sortType: FilmSortType = FilmSortType[this.sortingValue];
    let filteringCountry: string = this.filteringCountry !== this.humanFilmsCountries[0] ? this.filteringCountry : '';
    let filteringGenre: string = this.filteringGenre !== this.humanFilmsGenres[0] ? this.filteringGenre : '';
    this.humanService.findHumanFilms(this.humanId, sortType, filteringCountry, filteringGenre).subscribe(
      (humanRoles: any) => this.humanRoles = Object.entries(humanRoles),
      (error: any) => console.log(error)
    );
  }

  getHumanFilmsCountries(): void {
    this.humanService.findHumanFilmsCountries(this.humanId).subscribe(
      (filmsCountries: string[]) => this.humanFilmsCountries = this.humanFilmsCountries.concat(filmsCountries)
    );
  }

  getHumanFilmsGenres(): void {
    this.humanService.findHumanFilmsGenres(this.humanId).subscribe(
      (humanGenres: string[]) => this.humanFilmsGenres = this.humanFilmsGenres.concat(humanGenres),
      (error: any) => console.log(error)
    )
  }

}
