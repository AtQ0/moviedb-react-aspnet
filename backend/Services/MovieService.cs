using MovieDb.Api.Dtos.Movies;
using MovieDb.Api.Models;

namespace MovieDb.Api.Services;

public sealed class MovieService(TmdbClient tmdb)
{
    private const string ImageBase = "https://image.tmdb.org/t/p/w500";

    public async Task<IReadOnlyList<MovieDto>> GetApplicationMoviesAsync(
        MovieFeedType type,
        int? genreId,
        string? query,
        CancellationToken ct
    )
    {
        var page = await tmdb.FetchMoviesAsync(type, genreId, query, ct);

        return page.Results
            .Select(MapMovie)
            .ToList();
    }

    public async Task<IReadOnlyList<GenreDto>> GetGenresAsync(
        CancellationToken ct
    )
    {
        var res = await tmdb.GetGenresAsync(ct);

        return res.Genres
            .Select(g => new GenreDto(g.Id, g.Name))
            .ToList();
    }

    private static MovieDto MapMovie(TmdbMovieResult r) => new(
        Id: r.Id,
        Title: r.Title,
        Overview: r.Overview ?? "",
        ReleaseDate: r.ReleaseDate,
        PosterUrl: string.IsNullOrWhiteSpace(r.PosterPath)
            ? null
            : $"{ImageBase}{r.PosterPath}",
        BackdropUrl: string.IsNullOrWhiteSpace(r.BackdropPath)
            ? null
            : $"{ImageBase}{r.BackdropPath}",
        RatingAverage: r.VoteAverage,
        RatingCount: r.VoteCount,
        Popularity: r.Popularity,
        GenreIds: r.GenreIds ?? []
    );
}