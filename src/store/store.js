import { configureStore } from "@reduxjs/toolkit";
import { answersReducer } from "./answersSlice";
import { modalReducer } from "./modalSlice";

const store = configureStore({
    reducer: {
        answers: answersReducer,
        modal: modalReducer
    }
})

export default store;