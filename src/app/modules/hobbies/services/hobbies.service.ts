import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../../../services/loader.service';
import { Hobbie } from '../interfaces/hobbie';

@Injectable({
  providedIn: 'root'
})
export class HobbiesService {
  hobbies = [
    {
      id: '1',
      name: 'Football Soccer',
      imageUrl: 'assets/images/pictures/soccer-ball.jpeg',
      description: `
        <p>I love playing football with my friends who I see every weekend.</p>
        <p>Football is a sport that joins a lot of peoble together so we can have a great time doing something that is very athletic and enjoyable.</p>
        <p>My favorite teams are <b>Club America</b> (from Mexico) and <b>Real Madrid F.C.</b> (from Spain).</p>
      `
    },
    {
      id: '2',
      name: 'Math',
      imageUrl: 'https://images.pexels.com/photos/6256066/pexels-photo-6256066.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      description: `
        <p>Maths are beautiful because they are so perfect and precise. It is a tool that has been used by humanity for centuries helping us modeling the complex reality in which we live.</p>
        <p>With mathematics you can solve from simple problems to very complex hard problems and also predict the future (some times with great accuracy).</p>
        <p>My favorite mathematical topics are probability and statistics.</p>
      `
    },
    {
      id: '3',
      name: 'Video Games',
      imageUrl: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      description: `
        <p>Who does not like video games? Do I really need to put an explanation here?</p>
        <p>Video games are very fun to play. You can practice your motor skills and have a good time playing with your friends at the same time.</p>
      `
    },
  ];

  constructor(
    private loaderService: LoaderService
  ) { }

  getHobbies(): Observable<Hobbie[]> {
    this.loaderService.show();
    return new Observable(obs => {
      setTimeout(() => {
        obs.next(this.hobbies);
        obs.complete();
        this.loaderService.hide();
      }, 1000);
    });
  }
}
