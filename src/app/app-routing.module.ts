import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmListComponent } from './film-list/film-list.component';
import { FilmPageComponent } from './film-page/film-page.component';


const routes: Routes = [
  { path: 'films', component: FilmListComponent },
  { path: 'films/:id', component: FilmPageComponent }

  // { path: 'humans', component: HumanListComponent },
  // { path: 'genres', component: GenreListComponent },
  // { path: 'careers', component: CareerListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
