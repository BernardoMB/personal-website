import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hobbie } from '../interfaces/hobbie';
import { HobbiesService } from './hobbies.service';

@Injectable({
  providedIn: 'root'
})
export class HobbiesResolverService implements Resolve<any> {

  constructor(private hobbiesService: HobbiesService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.hobbiesService.getHobbies();
  }
}
