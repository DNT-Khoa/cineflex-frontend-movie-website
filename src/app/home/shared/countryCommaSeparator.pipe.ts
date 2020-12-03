import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'countryCommaSeparatorPipe'
})
export class CountryCommaSeparatorPipe implements PipeTransform {
  transform(value: any)  {
        let countries = [];
        for (let country of value) {
            countries.push(country.name);
        }

        return countries.join(', ');
  }
}