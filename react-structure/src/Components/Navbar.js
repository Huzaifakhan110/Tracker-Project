import React from 'react'
import Modal from './Modal'
const Navbar = () => {
  return (
   <>
    <Modal/>
    <nav className="navbar bg-dark">
        <div className="container-fluid">
            <a className="navbar-brand text-white">Tracker</a>
            <button className="btn btn-outline-secondary text-white" type="button" data-bs-toggle="modal" data-bs-target=".exampleModal">Add Activity</button>  
        </div>
      </nav>
   </>
  )
}

export default Navbar
