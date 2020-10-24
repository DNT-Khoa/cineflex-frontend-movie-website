import { Pipe, PipeTransform } from '@angular/core';
import { CategoryModal } from 'src/app/admin/categories/shared/category.modal';
@Pipe({
  name: 'categoryCommaSeparatorPipe'
})
export class CategoryCommaSeparatorPipe implements PipeTransform {
  transform(value: any) {
    let categories = [];
    for (const category of value as CategoryModal[]) {
        categories.push(category.name);
    }

    return categories.join(', ');
  }
}