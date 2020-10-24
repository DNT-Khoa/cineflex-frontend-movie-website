import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'directorCommaSeparatorPipe'
})
export class DirectorCommaSeparatorPipe implements PipeTransform {
  transform(value: any[]): string  {
        let directors = [];
        for (let crew of value) {
            if (crew.job === 'Director') {
                directors.push(crew.name);
            }
        }

        return directors.join(', ');
  }
}