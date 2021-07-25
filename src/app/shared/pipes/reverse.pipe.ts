import { Pipe, PipeTransform } from '@angular/core';
//import { isString } from '../helpers/helpers';

@Pipe({ name: 'reverse' })
export class ReversePipe implements PipeTransform {
  transform(input: any): any {
      //console.log('original',input);
      if (typeof input === 'string') {
          return input
          .split('')
          .reverse()
          .join('');
        }
        //console.log('reversed', Array.isArray(input) ? input.slice().reverse() : input);
    return Array.isArray(input) ? input.slice().reverse() : input;
  }
}