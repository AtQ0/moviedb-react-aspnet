import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MovieService } from '../../services/movie.service';
import type { MovieDto } from '../../shared/models/movie.dto';
import { MoviesSection } from '../movies-section/movies-section';

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
  standalone: true,
  imports: [MoviesSection],
  template: `
    @if (loading()) {
      <div class="h-full flex items-center justify-center">Loading...</div>
    } @else {
      <section class="flex flex-col">
        @if (error()) {
          <div class="text-red-500">{{ error() }}</div>
        } @else {
          <app-movies-section
            title="Trending"
            [movies]="trendingMovies()"
            [limit]="2"
            type="backdrop"
          />
          <app-movies-section
            title="Top Rated"
            [movies]="topRatedMovies()"
            [limit]="5"
            type="poster"
          />
          <app-movies-section
            title="Now Playing"
            [movies]="nowPlayingMovies()"
            [limit]="5"
            type="poster"
          />
        }
      </section>
    }
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
