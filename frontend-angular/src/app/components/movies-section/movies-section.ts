import { Component, computed, input } from '@angular/core';
import { MovieDto } from '../../shared/models/movie.dto';

@Component({
  selector: 'app-movies-section',
  imports: [],
  template: `
    <div class="text-left">
      <h1 class="text-2xl font-bold">{{ title() }}</h1>
    </div>
  `,
})
export class MoviesSection {
  readonly title = input.required<string>();
  readonly movies = input.required<MovieDto[]>();
  readonly limit = input<number | undefined>(undefined);
  readonly type = input<'poster' | 'backdrop'>('poster');

  private readonly list = computed(() => {
    const movies = this.movies();
    const limit = this.limit();
    return limit !== undefined ? movies.slice(0, limit) : movies;
  });
}
