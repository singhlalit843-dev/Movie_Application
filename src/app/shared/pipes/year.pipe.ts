import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'year',
  standalone: true,
})
export class YearPipe implements PipeTransform {
  transform(value?: string): string {
    if (!value) return '';
    return new Date(value).getFullYear().toString();
  }
}
