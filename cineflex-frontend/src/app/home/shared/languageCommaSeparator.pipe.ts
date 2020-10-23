import { Pipe, PipeTransform } from '@angular/core';
import { CategoryModal } from 'src/app/admin/categories/shared/category.modal';
@Pipe({
  name: 'languageCommaSeparatorPipe'
})
export class LanguageCommaSeparatorPipe implements PipeTransform {
  transform(value: any) {
    let languages = [];
    for (let language of value) {
        languages.push(language.name);
    }

    return languages.join(', ');
  }
}