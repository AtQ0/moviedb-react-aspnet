import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import type { MovieDTO, TmdbGenre } from "@/lib/shared/movies";
import { fetchJson } from "@/lib/fetchJson";
import MovieSection from "@/components/MoviesSection";

const DISCOVER_GENRE_NAMES = [
    "Action",
    "Science Fiction",
    "Adventure",
    "Fantasy",
    "War",
    "Animation",
    "Drama",
    "Horror",
];

export default function DiscoverPage() {
    const [searchParams] = useSearchParams();

    const genreIdParam = searchParams.get("genreId") ?? undefined;
    const queryParam = searchParams.get("q")?.trim() ?? "";

    const [movies, setMovies] = useState<MovieDTO[]>([]);
    const [genres, setGenres] = useState<TmdbGenre[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        async function loadData() {
            setLoading(true);
            setError(null);

            try {
                // Fetch genres and movies in parallel
                const genresPromise = fetchJson("/api/movies/genres", {
                    signal: controller.signal
                }) as Promise<TmdbGenre[]>;

                const moviesPromise = queryParam
                    ? fetchJson(
                        `/api/movies/discover?query=${encodeURIComponent(queryParam)}`,
                        { signal: controller.signal }
                    ) as Promise<MovieDTO[]>
                    : fetchJson(
                        genreIdParam
                            ? `/api/movies/discover?genreId=${genreIdParam}`
                            : "/api/movies/discover",
                        { signal: controller.signal }
                    ) as Promise<MovieDTO[]>;

                const [genresRes, moviesRes] = await Promise.all([
                    genresPromise,
                    moviesPromise
                ]);

                setGenres(genresRes);
                setMovies(Array.isArray(moviesRes) ? moviesRes : []);

            } catch (err) {
                if (err instanceof DOMException && err.name === "AbortError") return;

                setError(err instanceof Error ? err.message : "Failed to load");
                setMovies([]);
            } finally {
                setLoading(false);
            }
        }

        loadData();

        return () => controller.abort();

    }, [genreIdParam, queryParam]);

    const filterGenres = genres.filter((g) =>
        DISCOVER_GENRE_NAMES.includes(g.name)
    );

    if (error) {
        return (
            <div>
                <h1 className="text-2xl font-bold">Discover</h1>
                <p className="text-red-500 mt-2">{error}</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center">
                <p>Loading…</p>
            </div>
        );
    }

    return (
        <div>
            <MovieSection
                title="Discover"
                movies={movies}
                showGenreFilters
                genres={filterGenres}
            />
        </div>
    );
}