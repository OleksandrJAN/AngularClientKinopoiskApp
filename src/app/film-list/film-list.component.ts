import { Component, OnInit } from '@angular/core';

import { FilmService } from '../service/film.service';
import { Film } from '../domain/film';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {

  films: Film[];

  constructor(private filmService: FilmService) { }

  ngOnInit(): void {
    this.filmService.findAll().subscribe(
      (films: Film[]) => this.films = films
    );
  }

}
