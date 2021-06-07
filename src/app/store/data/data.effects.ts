import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ContactService } from '../../services/contact.service';

@Injectable()
export class DataEffects {
  
  constructor(
    private actions$: Actions,
    private contactService: ContactService
  ) {}

}
