import { Pipe, PipeTransform } from '@angular/core';
import { CategoryModal } from 'src/app/admin/categories/shared/category.modal';
@Pipe({
  name: 'categoryCommaSeparatorTMDBMoviePipe'
})
export class CategoryCommaSeparatorTMDBMoviePipe implements PipeTransform {
  transform(value: any) {
    let categories = [];
    for (const category of value) {
        categories.push(category.name);
    }
    
    return categories.join(', ');
  }
}