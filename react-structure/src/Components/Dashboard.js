import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './Modal';
import { getActivities, deleteActivity } from '../state/reduxReducer/activityReducer';
import UpdateModal from './UpdateModal';
const Dashboard = () => {
  const dispatch = useDispatch();
  const activities = useSelector((data) => data.activityData.data);
  //
  const [updateData, setupdateData] = useState({name:'sth from dashboard',type:"",description:"",duration:"",date:""})
  //
  let handleUpdate = (dataSent) => {
    // console.log("clicked update", dataSent);
    setupdateData(dataSent)
  }
  //
  useEffect(() => {
    dispatch(getActivities())
  }, []);
  return (
    <>
      {/* {activities.length>0?<UpdateModal />:<UpdateModal updateData={updateData}/>} */}
      <UpdateModal updateData={updateData}/>
      <Navbar />
      <section className="container mt-3 text-center">
        <h1> Exercise Tracker App</h1>
      </section>
      <section className="container mt-5 ">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {
            activities.length > 0 ? activities.map((data, index) => {
              return (
                <div className="card-deck col" key={index}>
                  <div className="card bg-light h-100">

                      <div className="card-header"> <h5 className="card-title text-center">{data.name}</h5></div>
                    <div className="card-body">

                      <div className="mb-3">
                        <span >
                          <b>
                            Type : 
                          </b>

                          {data.type}
                        </span>

                      </div>
                      <div className="mb-3">
                        <span >
                          <b>
                            Description : 
                          </b>

                          {data.description}
                        </span>

                      </div>
                      <div className="mb-3">
                        <span >
                          <b>
                            Duration : 
                          </b>

                          {data.duration}
                        </span>

                      </div>
                      <div className="mb-3">
                        <span >
                          <b>
                            Date : 
                          </b>
                          {data.date}
                        </span>

                      </div>

                      
                    </div>
                    <div className=" text-center mb-3">
                      <button className="btn btn-dark mx-2" type="button" onClick={() => { handleUpdate(data) }} data-bs-toggle="modal" data-bs-target="#updateModal" >Edit</button>
                      <button className="btn btn-danger" onClick={() => { dispatch(deleteActivity({ databaseId: data._id, stateId: index })) }}>Delete</button>

                    </div>
                  </div>
                </div>
              )
            }) : 'No Recrds'
          }

        </div>
      </section>
    </>
  )
}

export default Dashboard
