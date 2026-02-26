export interface MovieDto {
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
}