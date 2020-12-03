import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieModal } from 'src/app/admin/movies/shared/movie.modal';
import { HttpConfigService } from 'src/app/shared/http-config.service';
import { TMDBMovieDetailsModal } from './tmdbMovieDetails.modal';
import { TMDBRecommendationsModal } from './tmdbRecommendations.modal';

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

    getAllMovies() {
        return this.httpClient.get<MovieModal[]>(this.httpConfigService.getBaseUrl() + "/api/movies/all");
    }

    getAllTopRatedMovies() {
        return this.httpClient.get<MovieModal[]>(this.httpConfigService.getBaseUrl() + "/api/movies/toprated");
    }

    getAllNowplayingMovies() {
        return this.httpClient.get<MovieModal[]>(this.httpConfigService.getBaseUrl() + "/api/movies/nowplaying");
    }

    getAllComingSoonMovies() {
        return this.httpClient.get<MovieModal[]>(this.httpConfigService.getBaseUrl() + "/api/movies/comingsoon");
    }

    getCountMoviePerCategory(categoryId: number) {
        return this.httpClient.get<number>(this.httpConfigService.getBaseUrl() + "/api/movies/count", {
            params: {
                categoryId: categoryId.toString()
            }
        })
    }

    getAllMoviesByCategory(categoryId: number) {
        return this.httpClient.get<MovieModal[]>(this.httpConfigService.getBaseUrl() + "/api/movies/byCategory", {
            params: {
                categoryId: categoryId.toString()
            }
        })
    }

    checkIfMovieIsInDatabse(tmdbId: number) {
        return this.httpClient.get<boolean>(this.httpConfigService.getBaseUrl() + "/api/movies/checkExists/" + tmdbId);
    }

    getFourLatestNowPlayingMovies() {
        return this.httpClient.get<MovieModal[]>(this.httpConfigService.getBaseUrl() + '/api/movies/nowplaying/4');
    }

    getFourLatestComingSoonMovies() {
        return this.httpClient.get<MovieModal[]>(this.httpConfigService.getBaseUrl() + "/api/movies/comingsoon/4");
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

    getMovieRecommendationsByTmdbId(tmdbId: number) {
        return this.httpClient.get<TMDBRecommendationsModal>('https://api.themoviedb.org/3/movie/' + tmdbId + '/recommendations', {
            params: {
                api_key: this.httpConfigService.getTmdbApiKey()
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

    rateMovie(userEmail: string, movieId: number, rating: number) {
        return this.httpClient.post<any>(this.httpConfigService.getBaseUrl() + '/user/rateMovie', {userEmail, movieId, rating});
    }

    checkIfUserHasRatedMovie(userEmail: string, movieId: number) {
        return this.httpClient.get<boolean>(this.httpConfigService.getBaseUrl() + '/user/check/rateMovie', {
            params: new HttpParams()
                .set('email', userEmail)
                .set('movieId', movieId.toString())
        }
        )
    }

    getMovieRating(userEmail: string, movieId: number) {
        return this.httpClient.get<number>(this.httpConfigService.getBaseUrl() + '/user/value/rateMovie', {
            params: new HttpParams()
                .set('email', userEmail)
                .set('movieId', movieId.toString())
        }
        );
    }

    deleteMovieRating(userEmail: string, movieId: number) {
        return this.httpClient.delete<null>(this.httpConfigService.getBaseUrl() + '/user/deleteMovieRating', {
            params: new HttpParams()
                .set('email', userEmail)
                .set('movieId', movieId.toString())
        }
        );
    }

}