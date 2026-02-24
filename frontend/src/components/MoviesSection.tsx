import type { MovieDTO } from "@/lib/shared/movies";
import type { TmdbGenre } from "@/lib/shared/movies";
import GenreFilterButtons from "./GenreFilterButtons";

type MovieSectionProps = {
    title: string;
    movies: MovieDTO[];
    limit?: number;
    type?: "poster" | "backdrop";
    showGenreFilters?: boolean;
    genres?: TmdbGenre[];
};

export default function MovieSection({
    title,
    movies,
    limit,
    type = "poster",
    showGenreFilters = false,
    genres,
}: MovieSectionProps) {
    const list = limit !== undefined ? movies.slice(0, limit) : movies;
    const isPoster = type === "poster";

    return (
        <div className="py-8 text-left">
            <h1 className="text-2xl font-bold">{title}</h1>

            {showGenreFilters && genres && genres.length > 0 && (
                <GenreFilterButtons genres={genres} />
            )}

            <ul
                className={
                    isPoster
                        ? "mt-4 grid grid-cols-2 gap-4 list-none p-0 lg:flex lg:flex-row lg:flex-wrap"
                        : "mt-4 flex flex-col gap-4 xl:grid xl:grid-cols-2 xl:gap-4 list-none p-0"
                }
            >
                {list.map((movie) => (
                    <li
                        key={movie.id}
                        className={isPoster ? "w-fit" : undefined}
                    >
                        {type === "poster" ? (
                            <div className="group relative w-fit rounded-md border border-transparent transition-[border-color,opacity] hover:border-white">
                                {movie.posterUrl ? (
                                    <img
                                        src={movie.posterUrl}
                                        alt={movie.title}
                                        className="w-full rounded-md object-cover lg:w-52"
                                    />
                                ) : (
                                    <div className="aspect-[2/3] w-full min-w-[8rem] rounded-md bg-muted flex items-center justify-center text-xs text-muted-foreground">
                                        No poster
                                    </div>
                                )}
                                <div
                                    className="absolute inset-0 flex flex-col items-center justify-center rounded-md bg-black/50 p-2 text-center opacity-0 transition-opacity group-hover:opacity-100"
                                    aria-hidden
                                >
                                    <span className="font-bold text-white">
                                        {movie.title}
                                    </span>
                                    <span className="text-sm text-gray-300">
                                        {movie.releaseDate ? movie.releaseDate.slice(0, 4) : "—"}
                                    </span>
                                </div>
                            </div>
                        ) : type === "backdrop" ? (
                            <div className="relative">
                                {movie.backdropUrl ? (
                                    <img
                                        src={movie.backdropUrl}
                                        alt={movie.title}
                                        className="rounded-md object-cover w-full"
                                    />
                                ) : (
                                    <div className="aspect-video w-full rounded-md bg-muted flex items-center justify-center text-xs text-muted-foreground">
                                        No image
                                    </div>
                                )}
                                <div className="bg-black/50 absolute bottom-0 left-0 right-0 p-2">
                                    <h2 className="text-lg font-bold">{movie.title}</h2>
                                    <p className="text-sm text-gray-500">
                                        {movie.releaseDate ? movie.releaseDate.slice(0, 4) : "—"}
                                    </p>
                                </div>
                            </div>
                        ) : null}
                    </li>
                ))}
            </ul>
        </div>
    );
}