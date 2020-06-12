class GenreInfo {
    id: number;
    name: string;
}

export class Film {
    id: number;
    filmName: string;
    slogan: string;
    country: string;
    year: number;
    annotation: string;
    image: string;
   
    filmGenres: Array<GenreInfo> = new Array();
}
