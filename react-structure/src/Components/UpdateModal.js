import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
//
import { updateDataAPI } from '../state/reduxReducer/activityReducer'
//
const UpdateModal = ({ updateData }) => {
    const dispatch = useDispatch();
    const [typeList, setTypeList] = useState(['Run', 'Bicycle', 'Swim', 'Walk', 'Hike']);
    //
    const [updateDataModal, setupdateDataModal] = useState({ name: '', type: "", description: "", duration: "", date: "" })
    //
    useEffect((e) => {
        setupdateDataModal(updateData)
    }, [updateData])
    //
    let handleUpdatedata = (e) => {
        e.preventDefault();
        // console.log("new Data for update:", updateDataModal);
        dispatch(updateDataAPI(updateDataModal))
        // e.target.reset()
    }
    //
    return (
        <>
            <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="updateModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Edit Activity Information</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleUpdatedata}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" value={updateDataModal.name} onChange={(e) => setupdateDataModal({ ...updateData, name: e.target.value })} name='name' id="name" required placeholder="name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" value={updateDataModal.description} onChange={(e) => setupdateDataModal({ ...updateData, description: e.target.value })} name='description' id="description" required placeholder="description" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="type" className="form-label">Type</label>

                                    <select className="form-control" id='type' name='type' required onChange={(e) => setupdateDataModal({ ...updateData, type: e.target.value })}>
                                        {typeList.map(e => {
                                            if (e === updateDataModal.type) {
                                                return <option value={updateDataModal.type} selected >{updateDataModal.type}</option>
                                            } else {
                                                return <option value={e} >{e}</option>
                                            }
                                        })}
                                    </select>

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="duration" className="form-label">Duration</label>
                                    <input type="number" className="form-control" value={updateDataModal.duration} onChange={(e) => setupdateDataModal({ ...updateData, duration: e.target.value })} name='duration' id="duration" required placeholder="duration" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="date" className="form-label">Date</label>
                                    <input type="date" className="form-control" id="date" value={updateDataModal.date} onChange={(e) => setupdateDataModal({ ...updateData, date: e.target.value })} name="date" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" >Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UpdateModal