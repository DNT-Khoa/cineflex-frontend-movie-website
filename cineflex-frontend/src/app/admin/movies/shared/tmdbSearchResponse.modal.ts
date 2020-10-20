import { TMDBMovieModal } from './tmdbmovie.modal';

export interface TMDBSearchResponseModal {
    page: number,
    total_results: number,
    total_pages: number,
    results: TMDBMovieModal[]
}