import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilmListComponent } from './film-list/film-list.component';
import { FilmPageComponent } from './film-page/film-page.component';
import { HumanListComponent } from './human-list/human-list.component';
import { HumanPageComponent } from './human-page/human-page.component';


const routes: Routes = [
  { path: '', component: FilmListComponent },
  { path: 'films', component: FilmListComponent },
  { path: 'films/:id', component: FilmPageComponent },

  { path: 'humans', component: HumanListComponent },
  { path: 'humans/:id', component: HumanPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
