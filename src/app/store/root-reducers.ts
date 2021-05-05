import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { environment } from "src/environments/environment";

export const reducers: ActionReducerMap<{}> = {};

// Reducer for logging to the console every dispached action
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state, action) => {
        console.log('state', state);
        console.log('action', action);
        return reducer(state, action);
    };
}

// * If environment is produccion, logging every action will be disabled
export const metaReducers: MetaReducer<{}>[] = !environment.production ? [debug] : [];
