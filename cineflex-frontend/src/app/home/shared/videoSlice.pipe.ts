import { Pipe, PipeTransform } from '@angular/core';
import { CategoryModal } from 'src/app/admin/categories/shared/category.modal';
@Pipe({
  name: 'videoSlicePipe'
})
export class VideoSlicePipe implements PipeTransform {
  transform(value: any) {
    if (value && value.length > 5) {
      return value.slice(1, 5);
    }

    return value;
  }
}