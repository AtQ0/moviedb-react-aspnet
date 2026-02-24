using MovieDb.Api.Services;

namespace MovieDb.Api.Endpoints;

public static class MoviesEndpoints
{
    public static IEndpointRouteBuilder MapMovieEndpoints(this IEndpointRouteBuilder app)
    {
        var movies = app.MapGroup("/api/movies");

        movies.MapGet("/trending", GetMovies(MovieFeedType.Trending));
        movies.MapGet("/rated", GetMovies(MovieFeedType.Rated));
        movies.MapGet("/playing", GetMovies(MovieFeedType.Playing));

        movies.MapGet("/discover", async (
            int? genreId,
            string? query,
            MovieService s,
            CancellationToken ct) =>
        {
            var feedType = string.IsNullOrWhiteSpace(query)
                ? MovieFeedType.Discover
                : MovieFeedType.Search;

            var result = await s.GetApplicationMoviesAsync(
                feedType,
                genreId,
                query,
                ct
            );

            return Results.Ok(result);
        });

        movies.MapGet("/genres", async (MovieService s, CancellationToken ct) =>
            Results.Ok(await s.GetGenresAsync(ct)));

        return app;
    }

    private static Func<MovieService, CancellationToken, Task<IResult>> GetMovies(
        MovieFeedType type
    )
    {
        return async (MovieService s, CancellationToken ct) =>
        {
            var result = await s.GetApplicationMoviesAsync(
                type,
                null,
                null,
                ct
            );

            return Results.Ok(result);
        };
    }
}