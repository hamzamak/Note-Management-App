import { combineReducers } from 'redux';
import authReducers from './auth'

import adminReducers from './admin';

import professeurReducers from './professeur'
export const reducers = combineReducers({ adminReducers  , authReducers , professeurReducers});

