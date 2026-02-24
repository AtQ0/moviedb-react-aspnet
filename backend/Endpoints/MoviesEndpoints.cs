using MovieDb.Api.Services;

namespace MovieDb.Api.Endpoints;

public static class MoviesEndpoints
{
    public static IEndpointRouteBuilder MapMovieEndpoints(this IEndpointRouteBuilder app)
    {

        var movies = app.MapGroup("/api/movies");

        movies.MapGet("/trending", async (MovieService s, CancellationToken ct) =>
            Results.Ok(await s.GetMoviesAsync(MovieFeedType.Trending, null, null, ct)));

        movies.MapGet("/rated", async (MovieService s, CancellationToken ct) =>
            Results.Ok(await s.GetMoviesAsync(MovieFeedType.Rated, null, null, ct)));

        movies.MapGet("/playing", async (MovieService s, CancellationToken ct) =>
            Results.Ok(await s.GetMoviesAsync(MovieFeedType.Playing, null, null, ct)));

        movies.MapGet("/discover", async (
            int? genreId,
            string? query,
            MovieService s,
            CancellationToken ct) =>
        {
            MovieFeedType feedType = string.IsNullOrWhiteSpace(query)
            ? MovieFeedType.Discover
            : MovieFeedType.Search;

            var result = await s.GetMoviesAsync(
            feedType,
            genreId,
            query,
            ct);

            return Results.Ok(result);
        });


        movies.MapGet("/genres", async (MovieService s, CancellationToken ct) =>
            Results.Ok(await s.GetGenresAsync(ct)));

        return app;
    }
}