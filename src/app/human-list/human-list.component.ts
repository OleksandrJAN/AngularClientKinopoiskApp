import { Component, OnInit } from '@angular/core';

import { HumanService } from '../service/human.service';
import { Human } from '../domain/human';

@Component({
  selector: 'app-human-list',
  templateUrl: './human-list.component.html',
  styleUrls: ['./human-list.component.css']
})
export class HumanListComponent implements OnInit {

  humans: Human[];

  constructor(private humanService: HumanService) { }

  ngOnInit(): void {
    this.humanService.findAll().subscribe(
      (humans: Human[]) => this.humans = humans
    );
  }

}
