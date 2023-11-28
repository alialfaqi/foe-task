import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteAnswer } from '../store/answersSlice';
import { selectedChild, setSelectedTableRow, toggleModal } from '../store/modalSlice';

const MaintenaceTable = () => {

    const answers = useSelector((state) => state.answers);
    const dispatch = useDispatch();
    return (
        <table>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Malfunction Type</th>
                    <th>Importance Degree</th>
                    <th>Delivery date</th>
                    <th>Repair Schedule</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    answers?.map((answer, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{answer.malfunction}</td>
                            <td>{answer.importance}</td>
                            <td>{answer.date}</td>
                            <td>{answer.repairSchedule || "Not Specified"}</td>
                            <td>

                                <button className='btn-add' onClick={() => dispatch(toggleModal())}>Add</button>
                                <button className='btn-del' onClick={() => dispatch(deleteAnswer(index))}>Delete</button>
                                <button className='btn-repair' onClick={() => {
                                    dispatch(selectedChild("repair"))
                                    dispatch(setSelectedTableRow(index))
                                    dispatch(toggleModal())
                                }}>Repair</button>

                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    )
}

export default MaintenaceTable