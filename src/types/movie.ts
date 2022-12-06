export interface Genre {
  id: number;
  name: string;
}

export interface SpokenLanguage {
  name: string;
  iso_639_1: string;
}

export interface VideoResult {
  id: string;
  name: string;
  key?: string;
  site: string;
  type?: string;
}

export interface Movie {
  title: string;
  release_date?: string;
  runtime?: string;
  genres?: Genre[];
  overview?: string;
  poster_path?: string;
  vote_average?: number;
  vote_count?: number;
  budget?: number;
  revenue?: number;
  id: number;
  spoken_languages?: SpokenLanguage[];
  videos?: {
    results?: VideoResult[];
  };
}
