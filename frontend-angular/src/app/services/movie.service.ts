import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin, map, catchError, of } from "rxjs";
import type { MovieDto } from "../shared/models/movie.dto";

export type DashboardState = {
    loading: boolean;
    error: string | null;
    trending: MovieDto[];
    rated: MovieDto[];
    playing: MovieDto[];
}

@Injectable({ providedIn: 'root' })
export class MovieService {
    private readonly http = inject(HttpClient);

    getDashboardData(): Observable<DashboardState> {
        return forkJoin({
            trending: this.http.get<MovieDto[]>('/api/movies/trending'),
            rated: this.http.get<MovieDto[]>('/api/movies/rated'),
            playing: this.http.get<MovieDto[]>('/api/movies/playing'),
        }).pipe(
            map(({ trending, rated, playing }) => ({
                loading: false,
                error: null,
                trending,
                rated,
                playing,
            })),
            catchError((err) =>
                of({
                    loading: false,
                    error: err?.message ?? 'Request failed',
                    trending: [],
                    rated: [],
                    playing: [],
                } as DashboardState)
            )
        );
    }
}
