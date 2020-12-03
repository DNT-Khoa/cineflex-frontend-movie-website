import { CategoryModal } from '../../categories/shared/category.modal';

export class MovieModal {
    id?: number;
    tmdbId: number;
    title: string;
    rating: number;
    posterLink: string;
    backdropLink: string;
    movieType: string;
    filmLink: string;
    categories: CategoryModal[]
}