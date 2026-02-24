import { useEffect } from "react";
import type { MovieDTO } from "@/lib/shared/movies";
import { useState } from "react";
import { fetchJson } from "@/lib/fetchJson";
import MoviesSection from "./MoviesSection";

export default function Dashboard() {
    const [trendingMovies, setTrendingMovies] = useState<MovieDTO[]>([]);
    const [topRatedMovies, setTopRatedMovies] = useState<MovieDTO[]>([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState<MovieDTO[]>([]);
    const [reqError, setReqError] = useState<string | null>(null);


    useEffect(() => {
        const ac = new AbortController();

        (async () => {
            try {
                setReqError(null);

                const trendingMovies = await fetchJson("/api/movies/trending", { signal: ac.signal }) as MovieDTO[];
                const topRatedMovies = await fetchJson("/api/movies/rated", { signal: ac.signal }) as MovieDTO[];
                const nowPlayingMovies = await fetchJson("/api/movies/playing", { signal: ac.signal }) as MovieDTO[];

                setTrendingMovies(trendingMovies);
                setTopRatedMovies(topRatedMovies);
                setNowPlayingMovies(nowPlayingMovies);
            } catch (err) {
                if (err instanceof DOMException && err.name === "AbortError") return;
                setReqError(err instanceof Error ? err.message : "Fetch failed");

                setTrendingMovies([]);
                setTopRatedMovies([]);
                setNowPlayingMovies([]);
            }
        })();

        return () => ac.abort();
    }, [])

    if (trendingMovies.length === 0) {
        return <div className="h-full flex items-center justify-center">Loading...</div>;
    };


    return (
        <section className="flex flex-col">
            {reqError && (
                <div className="text-red-500">
                    {reqError}
                </div>
            )}

            <MoviesSection title="Trending" movies={trendingMovies} limit={2} type="backdrop" />
            <MoviesSection title="Top Rated" movies={topRatedMovies} limit={5} type="poster" />
            <MoviesSection title="Now Playing" movies={nowPlayingMovies} limit={5} type="poster" />
        </section>
    )

}