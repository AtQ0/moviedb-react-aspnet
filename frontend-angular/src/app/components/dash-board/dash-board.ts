import { Component, inject, computed } from "@angular/core";
import { MovieService } from "../../services/movie.service";
import { toSignal } from "@angular/core/rxjs-interop";
import { MovieDto } from "../../shared/models/movie.dto";

const INITIAL_STATE: {
    loading: boolean;
    error: string | null;
    trending: MovieDto[];
    rated: MovieDto[];
    playing: MovieDto[];
} = {
    loading: true,
    error: null,
    trending: [],
    rated: [],
    playing: [],
};

@Component({
    selector: 'app-dash-board',
    imports: [],
    template: `

    <div class="h-full">
        <h2>Home Page</h2>
        <p>Welcome to Dashboard</p>

    </div>
     
    `,
})
export class DashBoard {
    private readonly movieService = inject(MovieService);
    private readonly state = toSignal(this.movieService.getDashboardData(), {
        initialValue: INITIAL_STATE,
    });

    readonly loading = computed(() => this.state().loading);
    readonly error = computed(() => this.state().error);
    readonly trendingMovies = computed(() => this.state().trending);
    readonly topRatedMovies = computed(() => this.state().rated);
    readonly nowPlayingMovies = computed(() => this.state().playing);


}