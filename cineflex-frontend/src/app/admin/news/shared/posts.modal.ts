import { CategoryModal } from '../../categories/shared/category.modal';

export interface PostModal {
    id: number,
    backdropImage: string,
    title: string,
    content: string,
    categories: CategoryModal[],
    createdAt: number
}