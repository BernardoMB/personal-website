import { createFeatureSelector, createSelector, MemoizedSelector } from "@ngrx/store";
import { dataFeatureKey } from "./data.reducer";
import { DataState } from "./data.state";

const getInitials = (state: DataState): string => state.initials;
const getFullname = (state: DataState): string => state.fullname;
const getEmail = (state: DataState): string => state.email;
const getPhoneNumber = (state: DataState): string => state.phoneNumer;
const getAddress = (state: DataState): string => state.address;

// Select feature state
export const selectDataState: MemoizedSelector<object, DataState> = createFeatureSelector<DataState>(dataFeatureKey);

// Select values from feature state
export const selectInitials: MemoizedSelector<object, string> = createSelector(selectDataState, getInitials);
export const selectFullname: MemoizedSelector<object, string> = createSelector(selectDataState, getFullname);
export const selectEmail: MemoizedSelector<object, string> = createSelector(selectDataState, getEmail);
export const selectPhoneNumber: MemoizedSelector<object, string> = createSelector(selectDataState, getPhoneNumber);
export const selectAddress: MemoizedSelector<object, string> = createSelector(selectDataState, getAddress);
