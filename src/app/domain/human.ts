export class Human {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: Date;
    totalFilms: number;
    image: string;

    humanCareers: Array<string> = new Array();
}

export const HumanSortTypeMap = new Map<string, string>([
    ['популярности', 'byPopular'],
    ['имени', 'byName'],
    ['возрасту', 'byAge']
]);