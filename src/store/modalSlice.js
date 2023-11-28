import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modalIsVisible: false,
    selectedChild: "",
    selectedTableRowIndex: null
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        toggleModal: (state) => {
            state.modalIsVisible = !state.modalIsVisible
        },
        selectedChild: (state, action) => {
            state.selectedChild = action.payload
            console.log(state.selectedChild);
        },
        setSelectedTableRow: (state, action) => {
            state.selectedTableRowIndex = action.payload
        }
    }
})

export const { toggleModal, selectedChild, setSelectedTableRow } = modalSlice.actions;
export const modalReducer = modalSlice.reducer
