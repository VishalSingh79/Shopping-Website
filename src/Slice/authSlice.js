import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Token: localStorage.getItem("Token") ? JSON.parse(localStorage.getItem("Token")) : null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.Token = action.payload;
            localStorage.setItem("Token", JSON.stringify(action.payload));
        },
    }
})

export const { setToken } = authSlice.actions;
export default authSlice.reducer;