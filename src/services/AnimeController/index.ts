import { request } from '../request';
import type { AnimeSearchParams, AnimeSearchResponse, AnimeDetailResponse } from './typings';

export interface AnimeController {
    searchAnime: (params: AnimeSearchParams) => Promise<AnimeSearchResponse>;
    getAnimeDetail: (id: number) => Promise<AnimeDetailResponse>;
}

export const AnimeController: AnimeController = {
    searchAnime: async (params: AnimeSearchParams) => {
        const res = await request.get<AnimeSearchResponse>(`/anime`, { params });
        return res.data;
    },

    getAnimeDetail: async (id: number) => {
        const res = await request.get<AnimeDetailResponse>(`/anime/${id}`);
        return res.data;
    }
};