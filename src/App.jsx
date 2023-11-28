import './App.css'
import MaintenanceRequests from './components/MaintenanceRequests'
import MaintenaceTable from './components/MaintenaceTable'

import { useState } from 'react'
import Modal from './components/Modal'
import { useDispatch } from 'react-redux'
import { selectedChild, toggleModal } from './store/modalSlice'
import RepairSchedule from './components/RepairSchedule'


function App() {



  const dispatch = useDispatch();
  return (
    <>
      {/* <MaintenanceRequests /> */}
      <h1>Maintenance Request</h1>
      <button onClick={() => {
        dispatch(toggleModal())
        dispatch(selectedChild("maintenance"))
      }}
        className='btn-modal'>
        +Add
      </button>
      <Modal >
        <MaintenanceRequests />
      </Modal>
      <Modal >
        <RepairSchedule />
      </Modal>
      <MaintenaceTable />

    </>
  )
}

export default App
