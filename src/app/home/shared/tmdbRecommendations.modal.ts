import { TMDBMovieModal } from 'src/app/admin/movies/shared/tmdbmovie.modal';

export interface TMDBRecommendationsModal {
    page: number,
    results: TMDBMovieModal[],
    total_pages: number,
    total_results: number
}