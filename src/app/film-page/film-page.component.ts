import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FilmService } from '../service/film.service';
import { Film } from '../domain/film';


@Component({
  selector: 'app-film-page',
  templateUrl: './film-page.component.html',
  styleUrls: ['./film-page.component.css']
})
export class FilmPageComponent implements OnInit {
  
  film: Film = new Film();
  annotationParagraphs: string[];
  filmCast: any;

  constructor(
    private filmService: FilmService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getFilm();
  }

  getFilm(): void {
    this.activatedRoute.paramMap.subscribe(
      params => {
        const id: number = +params.get('id');
        this.getFilmInfo(id);
        this.getFilmCast(id);
      }
    );
  }

  getFilmInfo(id: number): void {
    this.filmService.findOne(id).subscribe(
      (film: Film) => {
        this.film = film;
        this.createAnnotationParagraphs();
      },
      (error: any) => console.log(error)
    );
  }

  createAnnotationParagraphs(): void {
    this.annotationParagraphs = this.film.annotation.split("\n");
  }

  getFilmCast(id: number): void {
    this.filmService.findFilmCast(id).subscribe(
      (filmCast: any) => this.filmCast = Object.entries(filmCast),
      (error: any) => console.log(error)
    );
  }



}
