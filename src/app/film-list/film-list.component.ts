import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { FilmService } from '../service/film.service';
import { Film, FilmSortTypeMap } from '../domain/film';
import { GenreService } from '../service/genre.service';
import { CountryService } from '../service/country.service';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {

  films: Film[];

  filmsSortingValues: string[] = Array.from(FilmSortTypeMap.keys());
  sortingValue: string = this.filmsSortingValues[0];

  filmsCountries: string[] = ['Все страны'];
  filteringCountry: string = this.filmsCountries[0];

  filmsGenres: string[] = ['Все жанры'];
  filteringGenre: string = this.filmsGenres[0];

  page: any;
  currentPageIndex: number;
  firstFilmIndexOnPage: number;

  constructor(
    private filmService: FilmService,
    private genreService: GenreService,
    private countryService: CountryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.getQueryParams(params);
      this.getFilms();
    });
    this.getFilmsCountries();
    this.getAllGenres();
  }

  getQueryParams(params: Params): void {
    // when filtering or sorting films we must start from first page
    this.currentPageIndex = 0;

    const country = params['country'];
    if (country !== undefined) {
      this.filteringCountry = country;
    }
    const genre = params['genre'];
    if (genre !== undefined) {
      this.filteringGenre = genre;
    }
    const sort = params['sort'];
    if (sort !== undefined) {
      this.sortingValue = sort;
    }
  }

  refreshFilms(): void {
    const queryParams = {
      country: this.filteringCountry,
      genre: this.filteringGenre,
      sort: this.sortingValue
    };
    this.router.navigate(['/films'], { queryParams: queryParams });
  }

  getFilms(): void {
    let pageIndex: string = this.currentPageIndex.toString();
    let sortType: string = FilmSortTypeMap.get(this.sortingValue);
    let filteringCountry: string = this.filteringCountry !== this.filmsCountries[0] ? this.filteringCountry : '';
    let filteringGenre: string = this.filteringGenre !== this.filmsGenres[0] ? this.filteringGenre : '';
    this.filmService.findAll(pageIndex, sortType, filteringCountry, filteringGenre).subscribe(
      (filmsPage: any) => {
        this.page = filmsPage;
        this.films = filmsPage.content;
        this.firstFilmIndexOnPage = filmsPage.pageable.offset;
      }
    );
  }

  getFilmsCountries(): void {
    this.countryService.findAll().subscribe(
      (filmsCountries: string[]) => this.filmsCountries = this.filmsCountries.concat(filmsCountries)
    );
  }

  getAllGenres(): void {
    this.genreService.findAll().subscribe(
      (genresNames: string[]) => this.filmsGenres = this.filmsGenres.concat(genresNames)
    );
  }

  changeCurrentPage(newPageNumber: number): void {
    this.currentPageIndex = newPageNumber;
    this.getFilms();
  }

}
