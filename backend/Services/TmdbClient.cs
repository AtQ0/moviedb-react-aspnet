using System.Text.Json;
using Microsoft.AspNetCore.WebUtilities;
using MovieDb.Api.Models;

namespace MovieDb.Api.Services;

public enum MovieFeedType
{
    Trending,
    Rated,
    Playing,
    Discover,
    Search
}

public sealed class TmdbClient(HttpClient http)
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true,
    };

    internal async Task<TmdbMoviePageResponse> FetchMoviesAsync(
        MovieFeedType type,
        int? genreId,
        string? query,
        CancellationToken ct
    )
    {
        var relative = type switch
        {
            MovieFeedType.Trending => "trending/movie/week",
            MovieFeedType.Rated => "movie/top_rated",
            MovieFeedType.Playing => "movie/now_playing",
            MovieFeedType.Discover => "discover/movie",
            MovieFeedType.Search => "search/movie",
            _ => throw new ArgumentOutOfRangeException(nameof(type), type, null),
        };

        var queryParams = new Dictionary<string, string?>
        {
            ["language"] = "en-US",
            ["page"] = "1",
        };

        if (type == MovieFeedType.Discover && genreId is not null)
        {
            queryParams["with_genres"] = genreId.Value.ToString();
        }

        if (type == MovieFeedType.Search && !string.IsNullOrWhiteSpace(query))
        {
            queryParams["query"] = query.Trim();
        }

        var url = QueryHelpers.AddQueryString(relative, queryParams);

        return await http.GetFromJsonAsync<TmdbMoviePageResponse>(
            url,
            JsonOptions,
            ct
        ) ?? new TmdbMoviePageResponse();
    }

    internal async Task<TmdbGenreListResponse> GetGenresAsync(CancellationToken ct)
    {
        return await http.GetFromJsonAsync<TmdbGenreListResponse>(
            "genre/movie/list",
            JsonOptions,
            ct
        ) ?? new TmdbGenreListResponse();
    }
}