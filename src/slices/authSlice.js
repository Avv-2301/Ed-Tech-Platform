import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    loading:false,
    token:localStorage.getItem("token") ?JSON.parse(localStorage.getItem("token")): null
}

const authSlice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        setSignupData(state, value){
            state.value = value.payload
        },
        setLoading(state, value){
            state.value = value.payload
        },
        setToken(state, value){
            state.token= value.payload
        }
    }
})

export const {setToken, setLoading, setSignupData} = authSlice.actions;
export default authSlice.reducer;