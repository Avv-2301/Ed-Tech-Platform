import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import profileReducer from '../slices/ProfileSlice';
import cartReducer from '../slices/ProfileSlice';
import courseReducer from "../slices/CourseSlice";
import viewCourseReducer from "../slices/ViewCourseSlice";

const rootReducers = combineReducers({
    auth:authReducer,
    profile:profileReducer,
    cart:cartReducer,
    course:courseReducer,
    viewCourse:viewCourseReducer,
})

export default rootReducers;