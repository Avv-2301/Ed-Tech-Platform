import { createSlice, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';

const initialState = {
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")):0
}

const createSlice = createSlice({
    name:'cart',
    initialState:initialState,
    reducers:{
        setTotalItems(state, value){
            state.value = value.payload
        }
    }
})

export const {setTotalItems} = createSlice.actions;
export default createSlice.reducers;