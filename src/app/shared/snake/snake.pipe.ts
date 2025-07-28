import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'snake',
    standalone: false
})
export class SnakePipe implements PipeTransform {
  public transform(value: string): string {
    return (value) ? value.replace(' ', '_') : value;
  }
}
