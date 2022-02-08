import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'snake'
})
export class SnakePipe implements PipeTransform {
  public transform(value: string): string {
    return (value) ? value.replace(' ', '_') : value;
  }
}
