export type MovieDTO = {
    id: number;
    title: string;
    overview: string;
    releaseDate: string | null;

    posterUrl: string | null;
    backdropUrl: string | null;

    ratingAverage: number;
    ratingCount: number;

    popularity: number;
    genreIds: number[];
};

export type TmdbGenre = {
    id: number;
    name: string;
}