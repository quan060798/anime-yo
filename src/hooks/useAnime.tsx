import { useRequest } from "ahooks";
import { AnimeController } from "@/services/AnimeController";
import { AnimeSearchParams, AnimeSearchResponse, AnimeDetailResponse } from "@/services/AnimeController/typings";

interface UseAnimeProps {
    onSearchSuccess?: (res: AnimeSearchResponse) => void;
    onSearchError?: (error: Error) => void;
    onGetAnimeDetailSuccess?: (res: AnimeDetailResponse) => void;
    onGetAnimeDetailError?: (error: Error) => void;
}

export const useAnime = (props: UseAnimeProps) => {
    const { onSearchSuccess, onSearchError, onGetAnimeDetailSuccess, onGetAnimeDetailError } = props;

    const { run: searchAnime, loading: searchAnimeLoading } = useRequest((params: AnimeSearchParams) => AnimeController.searchAnime(params), {
        manual: true,
        onSuccess: (res) => {
            onSearchSuccess?.(res);
        },
        onError: (error) => {
            onSearchError?.(error);
        },
        debounceWait: 250,
    })

    const { run: getAnimeDetail, loading: getAnimeDetailLoading } = useRequest((id: number) => AnimeController.getAnimeDetail(id), {
        manual: true,
        onSuccess: (res) => {
            onGetAnimeDetailSuccess?.(res);
        },
        onError: (error) => {
            onGetAnimeDetailError?.(error);
        },
    })

    return {
        searchAnime,
        searchAnimeLoading,
        getAnimeDetail,
        getAnimeDetailLoading
    }
}