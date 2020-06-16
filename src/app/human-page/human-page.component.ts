import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HumanService } from '../service/human.service';
import { Human, HumanSortType } from '../domain/human';


@Component({
  selector: 'app-human-page',
  templateUrl: './human-page.component.html',
  styleUrls: ['./human-page.component.css']
})
export class HumanPageComponent implements OnInit {

  private humanId: number;
  human: Human = new Human();
  humanRoles: any;

  sortingValues: string[] = Object.keys(HumanSortType);
  selectedSortingValue: string = this.sortingValues[0];
  humanGenres: string[] = ['Все жанры'];
  selectedFilteringGenre: string = this.humanGenres[0];


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
        this.getHumanFilms();
        this.getHumanGenres();
      }
    );
  }

  getHumanInfo(): void {
    this.humanService.findOne(this.humanId).subscribe(
      (human: Human) => this.human = human,
      (error: any) => console.log(error)
    );
  }

  getHumanFilms(): void {
    let filteringGenre: string = this.selectedFilteringGenre !== 'Все жанры' ? this.selectedFilteringGenre : null;
    this.humanService.findHumanRoles(this.humanId, this.selectedSortingValue, filteringGenre).subscribe(
      (humanRoles: any) => this.humanRoles = Object.entries(humanRoles),
      (error: any) => console.log(error)
    );
  }

  getHumanGenres(): void {
    this.humanService.findHumanGenres(this.humanId).subscribe(
      (humanGenres: string[]) => this.humanGenres = this.humanGenres.concat(humanGenres),
      (error: any) => console.log(error)
    )
  }

}
