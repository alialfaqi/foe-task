import { createSlice } from "@reduxjs/toolkit";

const answersSlice = createSlice({
    name: 'answers',
    initialState: [],
    reducers: {
        setAnswers: (state, action) => {
            return action.payload;
        },
        clearAnswers: (state) => {
            return [];
        },
        deleteAnswer: (state, action) => {
            state.splice(action.payload, 1)
        },
        updateAnswer: (state, payload) => {

        }
    },
});

export const { setAnswers, clearAnswers, deleteAnswer } = answersSlice.actions;
export const answersReducer = answersSlice.reducer;