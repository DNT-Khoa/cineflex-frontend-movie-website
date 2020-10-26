import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieModal } from 'src/app/admin/movies/shared/movie.modal';
import { HttpConfigService } from 'src/app/shared/http-config.service';
import { TMDBMovieDetailsModal } from './tmdbMovieDetails.modal';

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    constructor(private httpClient: HttpClient, private httpConfigService: HttpConfigService){}

    searchMovieByQueryKey(key: string) {
        return this.httpClient.get<MovieModal[]>(this.httpConfigService.getBaseUrl() + '/api/movies/search', {
            params: {
                key: key
            }
        });
    }

    getFourLatestNowPlayingMovies() {
        return this.httpClient.get<MovieModal[]>(this.httpConfigService.getBaseUrl() + '/api/movies/nowplaying/4');
    }

    getFourLatestComingSoonMovies() {
        return this.httpClient.get<MovieModal[]>(this.httpConfigService.getBaseUrl() + "/api/movies/comingsoon/4");
    }

    getTopRatedMovies() {
        return this.httpClient.get<MovieModal[]>(this.httpConfigService.getBaseUrl() + "/api/movies/toprated");
    }

    getFourTopRatedMovies() {
        return this.httpClient.get<MovieModal[]>(this.httpConfigService.getBaseUrl() + "/api/movies/toprated/4");
    }

    getAllMoviesLimit4() {
        return this.httpClient.get<MovieModal[]>(this.httpConfigService.getBaseUrl() + "/api/movies/all/4");
    }

    getMovieByTmdbId(tmbdId: number) {
        return this.httpClient.get<MovieModal>(this.httpConfigService.getBaseUrl() + '/api/movies/' + tmbdId);
    }

    getMovieDetailsByTmbdId(tmdbId: number) {
        return this.httpClient.get<TMDBMovieDetailsModal>('https://api.themoviedb.org/3/movie/' + tmdbId, {
            params: {
                api_key: this.httpConfigService.getTmdbApiKey(),
                append_to_response: 'videos,images,credits',
                include_image_language: 'en'
            }
        });
    }

    checkIfUserHasLikedMovie(movieId: number, email: string) {
        return this.httpClient.post<boolean>(this.httpConfigService.getBaseUrl() + '/user/check/like', {movieId, email});
    }

    likeMovie(movieId: number, email: string) {
        return this.httpClient.post<any>(this.httpConfigService.getBaseUrl() + '/user/like', { movieId, email });
    }

    unlikeMovie(movieId: number, email: string) {
        return this.httpClient.post<null>(this.httpConfigService.getBaseUrl() + '/user/unlike', { movieId, email });
    }
}