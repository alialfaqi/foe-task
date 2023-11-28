import React, { useState } from 'react'
import "./modal.css"
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '../store/modalSlice';
import MaintenanceRequests from './MaintenanceRequests';
import RepairSchedule from './RepairSchedule';

const Modal = ({ children }) => {
    //const [modal, setModal] = useState(false);
    // const toggleModal = () => {
    //     setModal(!modal)
    // }
    const dispatch = useDispatch();
    const { modalIsVisible, selectedChild } = useSelector((state) => state.modal)

    return (
        <>
            {/* <button onClick={() => dispatch(toggleModal())}
                className='btn-modal'>
                +Add
            </button> */}
            {modalIsVisible && (<div className='modal'>
                <div className="overlay" onClick={() => dispatch(toggleModal())}></div>
                <div className="modal-content">
                    {/* {children} */}
                    {selectedChild === 'maintenance' && <MaintenanceRequests />}
                    {selectedChild === 'repair' && <RepairSchedule />}
                </div>
            </div>)}


        </>
    )
}

export default Modal