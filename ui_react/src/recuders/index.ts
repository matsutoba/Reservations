import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../features';

export const RootReducer = combineReducers({
    counter: counterReducer
})

export type RootReducerType = ReturnType<typeof RootReducer>;