import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAnswers } from '../store/answersSlice'
import { toggleModal } from '../store/modalSlice'


const RepairSchedule = () => {
    const dateRef = useRef(null)
    const [RepairSchedule, setRepairSchedule] = useState("")
    const [error, setError] = useState("")
    const { selectedTableRowIndex } = useSelector((state) => state.modal)
    const answers = useSelector((state) => state.answers)
    const dispatch = useDispatch();

    const handleRepairSchedule = (schedule) => {
        setRepairSchedule(schedule)
    }

    const handleSubmit = () => {
        let isFormValid = validateSchedule();
        if (isFormValid) {
            const newAnswers = [...answers]; // Create a shallow copy of the answers array
            const selectedAnswer = { ...newAnswers[selectedTableRowIndex] }; // Create a shallow copy of the selected answer object

            // Update the repairSchedule property in the selected answer
            selectedAnswer.repairSchedule = RepairSchedule;

            // Update the newAnswers array with the modified selected answer
            newAnswers[selectedTableRowIndex] = selectedAnswer;

            // Dispatch an action to update the Redux state
            dispatch(setAnswers(newAnswers));
            dispatch(toggleModal())
        }
    }

    const validateSchedule = () => {
        let isValid = true;

        const inputDate = dateRef.current.value;
        const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(inputDate);

        const arrayOfSchedules = answers.map((answer) => answer.repairSchedule)
        //TO validate that date input is entered
        if (!isValidDate) {
            setError("You Should Enter a Date")
            console.log(arrayOfSchedules);
            isValid = false
        } //to validate that the date input is not before the present day 
        else if (isValidDate) {
            const currentDate = new Date();
            const inputDateObj = new Date(inputDate);
            if (inputDateObj < currentDate) {

                setError("You Should Enter a Valid Date")
                isValid = false
            } else if (arrayOfSchedules.includes(inputDate)) {
                setError("Busy Schedule Find Another Date")
                isValid = false
            }
        }
        return isValid
    }

    return (
        <>
            <div>
                <p className='option-header'>Repair Date</p>
                <input type="date" ref={dateRef} onChange={(e) => handleRepairSchedule(e.target.value)} />
                <p className='msg-err'>{error}</p>
                <button onClick={handleSubmit} className='btn-submit'>
                    Submit
                </button>
            </div>
        </>
    )
}

export default RepairSchedule