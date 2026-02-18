var builder = WebApplication.CreateBuilder(args);

// Swagger (OpenAPI)
builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Simple test endpoint for React/Vite proxy
app.MapGet("/api/health", () => Results.Ok(new { status = "ok" }))
   .WithName("Health");

// placeholder endpoint I can later replace with real movie routes
app.MapGet("/api/movies", () =>
{
    return Results.Ok(new[]
    {
        new { id = 1, title = "Alien" },
        new { id = 2, title = "Blade Runner" }
    });
})
.WithName("GetMovies");

app.Run();
