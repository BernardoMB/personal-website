import { Action, createReducer, on } from '@ngrx/store';
import { initialDataState, DataState } from './data.state';

export const dataFeatureKey = 'data';

const dataReducer = createReducer(
  initialDataState
);

export function reducer(state: DataState | undefined, action: Action) {
  return dataReducer(state, action);
}
