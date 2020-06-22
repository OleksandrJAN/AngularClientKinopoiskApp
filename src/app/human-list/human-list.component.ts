import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    private humanService: HumanService,
    private genreService: GenreService,
    private careerService: CareerService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getQueryParams();
    this.getHumans();
    this.getHumansCareers();
    this.getHumansGenres();
  }

  getQueryParams(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const career = params['career'];
      if (career !== undefined) {
        this.filteringCareer = career;
      }
      const genre = params['genre'];
      if (genre !== undefined) {
        this.filteringGenre = genre;
      }
    });
  }

  getHumans(): void {
    let sortType: HumanSortType = HumanSortType[this.sortingValue];
    let filteringCareer: string = this.filteringCareer !== this.humansCareers[0] ? this.filteringCareer : '';
    let filteringGenre: string = this.filteringGenre !== this.humansGenres[0] ? this.filteringGenre : '';
    this.humanService.findAll(sortType, filteringCareer, filteringGenre).subscribe(
      (humans: Human[]) => this.humans = humans
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

}
