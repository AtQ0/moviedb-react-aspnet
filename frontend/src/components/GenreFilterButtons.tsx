import { useNavigate, useSearchParams } from "react-router-dom";
import type { TmdbGenre } from "@/lib/shared/movies";
import { Button } from "@/components/ui/button";

export default function GenreFilterButtons({ genres }: { genres: TmdbGenre[] }) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const selectedId = searchParams.get("genreId");

    function handleClick(genreId: number) {
        if (selectedId === String(genreId)) {
            navigate("/discover");
        } else {
            navigate(`/discover?genreId=${genreId}`);
        }
    }

    return (
        <div className="grid grid-cols-3 gap-2 mt-4 min-[500px]:grid-cols-[repeat(auto-fill,minmax(130px,1fr))]">
            {genres.map((genre) => (
                <Button
                    key={genre.id}
                    type="button"
                    onClick={() => handleClick(genre.id)}
                    className={`cursor-pointer w-full h-[42px] max-w-[150px] min-[500px]:flex-1 min-[500px]:min-w-0 text-xs ${selectedId === String(genre.id)
                        ? "!bg-white !text-black"
                        : ""
                        }`}
                >
                    {genre.name}
                </Button>
            ))}
        </div>
    );
}