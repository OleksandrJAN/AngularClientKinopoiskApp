import { DatePipe } from '@angular/common';

class CareerInfo {
    id: number;
    name: string;
}

export class Human {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: Date;
    totalFilms: number;
    image: string;

    careersInfo: Array<CareerInfo> = new Array();
}

export enum HumanSortType {
    году = 'byYear',
    названию = 'byName'
}
