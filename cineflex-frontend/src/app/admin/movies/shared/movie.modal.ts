import { CategoryModal } from '../../categories/shared/category.modal';

export class MovieModal {
    id?: number;
    tmdbId: number;
    title: String;
    rating: number;
    posterLink: String;
    backdropLink: String;
    movieType: String;
    filmLink: String;
    categories: CategoryModal[]
}