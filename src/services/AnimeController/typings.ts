enum ANIME_TYPE {
    TV = 'tv',
    MOVIE = 'movie',
    OVA = 'ova',
    SPECIAL = 'special',
    ONA = 'ona',
    MUSIC = 'music',
    CM = 'cm',
    PV = 'pv',
    TV_SPECIAL = 'tv_special',
}

enum ANIME_STATUS {
    AIRING = 'airing',
    COMPLETE = 'complete',
    UPCOMING = 'upcoming',
}

enum ANIME_RATING {
    G = 'g',
    PG = 'pg',
    PG_13 = 'pg_13',
    R_17 = 'r_17',
    R = 'r',
    RX = 'rx',
}

enum ANIME_ORDER_BY {
    MAL_ID = 'mal_id',
    TITLE = 'title',
    START_DATE = 'start_date',
    END_DATE = 'end_date',
    EPISODES = 'episodes',
    SCORE = 'score',
    SCORED_BY = 'scored_by',
    RANK = 'rank',
    POPULARITY = 'popularity',
    MEMBERS = 'members',
    FAVORITES = 'favorites',
}

export interface AnimeSearchParams {
    unapproved?: boolean;
    page?: number;
    limit?: number;
    q?: string;
    type?: ANIME_TYPE;
    score?: number;
    min_score?: number;
    max_score?: number;
    status?: ANIME_STATUS;
    rating?: ANIME_RATING;
    sfw?: boolean;
    genres?: string;
    genres_exclude?: string;
    order_by?: ANIME_ORDER_BY;
    sort?: 'asc' | 'desc';
    letter?: string;
    producers?: string;
    start_date?: string;
    end_date?: string;
}

// Common interfaces
export interface Image {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
}

export interface Title {
    type: string;
    title: string;
}

export interface Trailer {
    youtube_id: string;
    url: string;
    embed_url: string;
}

export interface From {
    day: number;
    month: number;
    year: number;
}

export interface Prop {
    from: From;
    to: From;
    string: string;
}

export interface Aired {
    from: string;
    to: string;
    prop: Prop;
}

export interface Broadcast {
    day: string;
    time: string;
    timezone: string;
    string: string;
}

export interface Demographic {
    mal_id: number;
    type: string;
    name: string;
    url: string;
}

export interface Pagination {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: Items;
}

export interface Items {
    count: number;
    total: number;
    per_page: number;
}

// Anime data interfaces
export interface AnimeData {
    mal_id: number;
    url: string;
    images: { [key: string]: Image };
    trailer: Trailer;
    approved: boolean;
    titles: Title[];
    title: string;
    title_english: string;
    title_japanese: string;
    title_synonyms: string[];
    type: string;
    source: string;
    episodes: number;
    status: string;
    airing: boolean;
    aired: Aired;
    duration: string;
    rating: string;
    score: number;
    scored_by: number;
    rank: number;
    popularity: number;
    members: number;
    favorites: number;
    synopsis: string;
    background: string;
    season: string;
    year: number;
    broadcast: Broadcast;
    producers: Demographic[];
    licensors: Demographic[];
    studios: Demographic[];
    genres: Demographic[];
    explicit_genres: Demographic[];
    themes: Demographic[];
    demographics: Demographic[];
}

export interface AnimeSearchResponse {
    data: AnimeData[];
    pagination: Pagination;
}

export interface AnimeDetailResponse {
    data: AnimeData;
}
