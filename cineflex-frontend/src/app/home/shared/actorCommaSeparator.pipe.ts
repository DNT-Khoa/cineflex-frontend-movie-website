import { Pipe, PipeTransform } from '@angular/core';
import { CategoryModal } from 'src/app/admin/categories/shared/category.modal';
@Pipe({
  name: 'actorCommaSeparatorPipe'
})
export class ActorCommaSeparatorPipe implements PipeTransform {
  transform(value: any) {
    let actors = [];
    for (let i = 0; i < 3; i++) {
        actors.push(value[i].name);
    }

    return actors.join(', ');
  }
}