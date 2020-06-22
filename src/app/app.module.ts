import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

import { FilmService } from './service/film.service';
import { HumanService } from './service/human.service';
import { GenreService } from './service/genre.service';
import { CareerService } from './service/career.service';

import { AppComponent } from './app.component';
import { FilmListComponent } from './film-list/film-list.component';
import { FilmPageComponent } from './film-page/film-page.component';
import { HumanListComponent } from './human-list/human-list.component';
import { HumanPageComponent } from './human-page/human-page.component';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    FilmListComponent,
    FilmPageComponent,
    HumanListComponent,
    HumanPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    FilmService,
    HumanService,
    GenreService,
    CareerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
