import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { HumanService } from '../service/human.service';
import { Human, HumanSortType } from '../domain/human';
import { GenreService } from '../service/genre.service';
import { CareerService } from '../service/career.service';

@Component({
  selector: 'app-human-list',
  templateUrl: './human-list.component.html',
  styleUrls: ['./human-list.component.css']
})
export class HumanListComponent implements OnInit {

  humans: Human[];

  humanSortingValues = Object.keys(HumanSortType);
  sortingValue: string = this.humanSortingValues[0];

  humansCareers: string[] = ['Все карьеры'];
  filteringCareer: string = this.humansCareers[0];

  humansGenres: string[] = ['Все жанры'];
  filteringGenre: string = this.humansGenres[0];

  page: any;
  currentPageIndex: number;
  firstHumanIndexOnPage: number;

  constructor(
    private humanService: HumanService,
    private genreService: GenreService,
    private careerService: CareerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.getQueryParams(params);
      this.getHumans();
    });
    this.getHumansCareers();
    this.getHumansGenres();
  }

  getQueryParams(params: Params): void {
    // when filtering or sorting humans we must start from first page
    this.currentPageIndex = 0;

    const career = params['career'];
    if (career !== undefined) {
      this.filteringCareer = career;
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

  refreshHumans(): void {
    const queryParams = {
      country: this.filteringCareer,
      genre: this.filteringGenre,
      sort: this.sortingValue
    };
    this.router.navigate(['/humans'], { queryParams: queryParams });
  }

  getHumans(): void {
    let pageIndex: string = this.currentPageIndex.toString();
    let sortType: HumanSortType = HumanSortType[this.sortingValue];
    let filteringCareer: string = this.filteringCareer !== this.humansCareers[0] ? this.filteringCareer : '';
    let filteringGenre: string = this.filteringGenre !== this.humansGenres[0] ? this.filteringGenre : '';
    this.humanService.findAll(pageIndex, sortType, filteringCareer, filteringGenre).subscribe(
      (humansPage: any) => {
        this.page = humansPage;
        this.humans = humansPage.content;
        this.firstHumanIndexOnPage = humansPage.pageable.offset;
      }
    );
  }

  getHumansCareers(): void {
    this.careerService.findAll().subscribe(
      (careersNames: string[]) => this.humansCareers = this.humansCareers.concat(careersNames)
    );
  }

  getHumansGenres(): void {
    this.genreService.findAll().subscribe(
      (genresNames: string[]) => this.humansGenres = this.humansGenres.concat(genresNames)
    );
  }

  changeCurrentPage(newPageNumber: number): void {
    this.currentPageIndex = newPageNumber;
    this.getHumans();
  }

}
