export class Human {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: Date;
    totalFilms: number;
    image: string;

    humanCareers: Array<string> = new Array();
}

export enum HumanSortType {
    популярности = 'byPopular',
    имени = 'byName'
}