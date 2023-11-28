import React, { createRef, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAnswers } from '../store/answersSlice';
import { toggleModal } from '../store/modalSlice';

const MaintenanceRequests = () => {


    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [errorList, setErrorList] = useState({})
    const [dateError, setDateError] = useState('');
    const dateRef = useRef(null);

    const dispatch = useDispatch();
    const answers = useSelector((state) => state.answers)

    const questions = [
        {
            id: 1,
            name: "malfunction",
            text: 'Type of malfunction:',
            options: ['Irrigation System Failure', 'Pest Infestation', 'Soil Nutrient Deficiency', 'Equipment Breakdown'],
        },
        {
            id: 2,
            name: "importance",
            text: 'Degree of importance',
            options: ['Mild', 'Moderate', 'Severe', 'Critical'],
        },
    ];








    const handleAnswerChange = (questionId, selectedAnswer) => {
        setSelectedAnswers((prevSelectedAnswers) => ({
            ...prevSelectedAnswers,
            [questionId]: selectedAnswer,
        }));
    };

    // const handleSubmit = () => {
    //     // Perform any logic with the submitted selected options
    //     // console.log('Selected Options:', answers);

    //     // Push the selectedOptions object into the answers array
    //     //  setAnswers((prevAnswers) => [...prevAnswers, selectedAnswers]);

    //     dispatch(setAnswers([...answers, selectedAnswers]))

    //     // // Uncheck radio inputs
    //     // radioRefs.current.forEach((ref) => (ref.current.checked = false));

    //     // // Clear date input
    //     // dateRef.current.value = '';

    //     // Clear the selectedOptions state
    //     setSelectedAnswers({});

    //     setSubmitted(true);
    //     setDisplayedTable(true);
    //     dispatch(toggleModal())

    // };

    const handleSubmit = () => {
        // Validation checks
        let isFormValid = validateForm();
        // validateForm();
        if (isFormValid) {
            // Perform any logic with the submitted selected options
            // console.log('Selected Options:', answers);

            // Push the selectedOptions object into the answers array
            dispatch(setAnswers([...answers, selectedAnswers]));

            // Clear the selectedOptions state
            setSelectedAnswers({});
            // Clear the errorList state
            dispatch(toggleModal());

        }
    };
    const validateForm = () => {
        // Implement your validation logic here
        // For example, check if all questions have been answered

        setErrorList({})
        let isValid = true;


        for (const question of questions) {
            if (!selectedAnswers[question.name]) {
                isValid = false
                setErrorList((prevErrorList) => ({
                    ...prevErrorList,
                    [question.name]: "You Should Select an Option"

                }))
            }
        }
        const inputDate = dateRef.current.value;
        const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(inputDate);

        //TO validate that date input is entered
        if (!isValidDate) {
            setErrorList((prevErrorList) => ({
                ...prevErrorList,
                date: "You Should Enter a Date"
            }))
            isValid = false
        } //to validate that the date input is not before the present day 
        else if (isValidDate) {
            const currentDate = new Date();
            const inputDateObj = new Date(inputDate);
            if (!(inputDateObj >= currentDate)) {
                setErrorList((prevErrorList) => ({
                    ...prevErrorList,
                    date: "You Should Enter a Valid Date"
                }))
                isValid = false
            }
        }
        return isValid

    };





    return (
        <>
            <div>
                {questions.map((question) => (
                    <div key={question.id}>

                        <ul className='option'>
                            <p className='option-header'>{question.text}</p>
                            {question.options.map((option, index) => (
                                <li key={index}>
                                    <label>
                                        <input
                                            type="radio"
                                            name={`question${question.id}`}
                                            value={option}
                                            onChange={() => handleAnswerChange(question.name, option)}
                                        />
                                        {option}
                                    </label>
                                </li>
                            ))}
                            <p className='msg-err'>{errorList[question.name]}</p>
                        </ul>
                    </div>
                ))}
                <p className='option-header'>Delivery Date</p>
                <input type="date" ref={dateRef} onChange={(e) => handleAnswerChange("date", e.target.value)} />
                <p className='msg-err'>{errorList.date}</p>
                <button onClick={handleSubmit} className='btn-submit'>
                    Submit
                </button>

            </div>


        </>
    );
};

export default MaintenanceRequests;
