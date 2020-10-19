import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpConfigService } from 'src/app/shared/http-config.service';
import { MovieModal } from './movie.modal';

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    constructor(private httpClient: HttpClient, private toastr: ToastrService, private httpConfigService: HttpConfigService) {

    }

    getAllComingMovies() {
        return this.httpClient.get<MovieModal[]>(this.httpConfigService.getBaseUrl() + '/admin/movies/comingsoon');
    }

    addNewMovie(movieModal: MovieModal) {
        return this.httpClient.post<MovieModal>(this.httpConfigService.getBaseUrl() + '/admin/movies', movieModal);
    }

    updateMovieById(movieId: bigint, movieModal: MovieModal) {
        return this.httpClient.put(this.httpConfigService.getBaseUrl() + '/admin/movies/' + movieId, movieModal);
    }

    deleteMovie(movieId: bigint) {
        return this.httpClient.delete(this.httpConfigService.getBaseUrl() + '/admin/movies/' + movieId);
    }

}