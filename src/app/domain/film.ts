export class Film {
    id: number;
    filmName: string;
    slogan: string;
    country: string;
    year: number;
    annotation: string;
    image: string;

    filmGenres: Array<string> = new Array();
    filmCountries: Array<string> = new Array();
}

export const FilmSortTypeMap = new Map<string, string>([
    ['году', 'byYear'],
    ['названию', 'byName']
]);
