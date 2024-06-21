import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    loading:false,
    token:localStorage.getItem("token") ?JSON.parse(localStorage.getItem("token")): null
}

const authSlice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        setLoading(state, value){
            state.value = value.payload
        },
        setToken(state, value){
            state.token= value.payload
        }
    }
})

export const {setToken, setLoading} = authSlice.actions;
export default authSlice.reducer;