import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import profileReducer from '../slices/ProfileSlice';
import cartReducer from '../slices/ProfileSlice';

const rootReducers = combineReducers({
    auth:authReducer,
    profile:profileReducer,
    cart:cartReducer
})

export default rootReducers;