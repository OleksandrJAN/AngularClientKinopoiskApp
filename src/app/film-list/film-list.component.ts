import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FilmService } from '../service/film.service';
import { Film, FilmSortType } from '../domain/film';
import { GenreService } from '../service/genre.service';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {

  films: Film[];

  filmsSortingValues = Object.keys(FilmSortType);
  sortingValue: string = this.filmsSortingValues[0];

  filmsCountries: string[] = ['Все страны'];
  filteringCountry: string = this.filmsCountries[0];

  filmsGenres: string[] = ['Все жанры'];
  filteringGenre: string = this.filmsGenres[0];

  constructor(
    private filmService: FilmService,
    private genreService: GenreService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getQueryParams();
    this.getFilms();
    this.getFilmsCountries();
    this.getAllGenres();
  }

  getQueryParams(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const country = params['country'];
      if (country !== undefined) {
        this.filteringCountry = country;
      }
      const genre = params['genre'];
      if (genre !== undefined) {
        this.filteringGenre = genre;
      }
    });
  }

  getFilms(): void {
    let sortType: FilmSortType = FilmSortType[this.sortingValue];
    let filteringCountry: string = this.filteringCountry !== this.filmsCountries[0] ? this.filteringCountry : '';
    let filteringGenre: string = this.filteringGenre !== this.filmsGenres[0] ? this.filteringGenre : '';
    this.filmService.findAll(sortType, filteringCountry, filteringGenre).subscribe(
      (films: Film[]) => this.films = films
    );
  }

  getFilmsCountries(): void {
    this.filmService.findFilmsCountries().subscribe(
      (filmsCountries: string[]) => this.filmsCountries = this.filmsCountries.concat(filmsCountries)
    );
  }

  getAllGenres(): void {
    this.genreService.findAll().subscribe(
      (genresNames: string[]) => this.filmsGenres = this.filmsGenres.concat(genresNames)
    );
  }

}
