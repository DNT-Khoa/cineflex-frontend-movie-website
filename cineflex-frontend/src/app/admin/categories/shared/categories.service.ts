import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpConfigService } from 'src/app/shared/http-config.service';
import { CategoryModal } from './category.modal';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    constructor(private httpClient: HttpClient, private httpConfigService: HttpConfigService) {
    }

    getAllCategories() {
        return this.httpClient.get<CategoryModal[]>(this.httpConfigService.getBaseUrl() + '/admin/categories');
    }

    addNewCategory(category: { name: string }) {
        return this.httpClient.post<CategoryModal>(this.httpConfigService.getBaseUrl() + '/admin/categories', category);
    }

    updateCategoryById(id: bigint, category: CategoryModal) {
        return this.httpClient.put(this.httpConfigService.getBaseUrl() + '/admin/categories/' + id, category);
    }

    deleteCategoryById(id: bigint) {
        return this.httpClient.delete(this.httpConfigService.getBaseUrl() + "/admin/categories/" + id);
    }

    searchCategoryByName(searchKey: string) {
        return this.httpClient.get<CategoryModal[]>(this.httpConfigService.getBaseUrl() + "/admin/categories/search", 
            {
               params: {
                   searchKey: searchKey
               } 
            }
        )
    }
}