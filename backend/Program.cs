using System.Net.Http.Headers;
using MovieDb.Api.Endpoints;
using MovieDb.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

// Create, configure and pass an HttpClient to TmdbClient whenever its called
builder.Services.AddHttpClient<TmdbClient>((sp, client) =>
{
    var token = sp.GetRequiredService<IConfiguration>()["Tmdb:ReadAccessToken"];
    if (string.IsNullOrWhiteSpace(token))
        throw new InvalidOperationException("Tmdb:ReadAccessToken is not configured.");

    client.BaseAddress = new Uri("https://api.themoviedb.org/3/");
    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
    client.DefaultRequestHeaders.Accept.ParseAdd("application/json");
})
.ConfigureHttpClient(c => c.Timeout = TimeSpan.FromSeconds(10));

builder.Services.AddScoped<MovieService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapHealthEndpoints();
app.MapMovieEndpoints();

app.Run();