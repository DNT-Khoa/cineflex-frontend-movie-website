import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpConfigService } from 'src/app/shared/http-config.service';
import { MovieModal } from './movie.modal';
import { TMDBSearchResponseModal } from './tmdbSearchResponse.modal';

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    constructor(private httpClient: HttpClient, private toastr: ToastrService, private httpConfigService: HttpConfigService) {

    }

    getAllComingMovies() {
        return this.httpClient.get<MovieModal[]>(this.httpConfigService.getBaseUrl() + '/api/movies/comingsoon');
    }

    getAllNowPlayingMovies() {
        return this.httpClient.get<MovieModal[]>(this.httpConfigService.getBaseUrl() + '/api/movies/nowplaying');
    }

    addNewMovie(movieModal: MovieModal) {
        return this.httpClient.post<MovieModal>(this.httpConfigService.getBaseUrl() + '/admin/movies', movieModal);
    }

    updateMovieById(movieId: number, movieModal: MovieModal) {
        return this.httpClient.put(this.httpConfigService.getBaseUrl() + '/admin/movies/' + movieId, movieModal);
    }

    deleteMovie(movieId: number) {
        return this.httpClient.delete(this.httpConfigService.getBaseUrl() + '/admin/movies/' + movieId);
    }

    searchMovieByTitle(queryKey: String) {
        return this.httpClient.get<TMDBSearchResponseModal>('https://api.themoviedb.org/3/search/movie?api_key=' + this.httpConfigService.getTmdbApiKey() + '&' + 'query=' + queryKey);
    }

}