import { useState } from "react"
import { addData, insertData, updateData} from '../state/reduxReducer/activityReducer';
import { useDispatch } from 'react-redux';
const Modal = () => {
    const [typeList,setTypeList] = useState(['Run', 'Bicycle', 'Swim', 'Walk', 'Hike'])
    const dispatch = useDispatch();
    const [getInput, setGetInput] = useState({
        name : '',
        description : '',
        type : '',
        duration : '',
        date : ''
    });
    const setData = (e) => {
        e.preventDefault();
        setGetInput({...getInput,[e.target.name] : e.target.value})
    }
    const passData = (event) => {
        event.preventDefault();
        console.log("getInput:",getInput);
        dispatch(insertData(getInput));
        setGetInput({
            name : '',
            description : '',
            type : '',
            duration : '',
            date : ''
        })
    }
    return(
        <div className="modal fade exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5">Add Activity Information</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form onSubmit={passData}>
                    <div className="modal-body">
                        <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' id="name" value={getInput.name} onChange={setData} required placeholder="name" />
                        </div>
                        <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" name='description' id="description" value={getInput.description} onChange={setData} required placeholder="description" />
                        </div>
                        <div className="mb-3">
                        <label htmlFor="type" className="form-label">Type</label>

                        <select className="form-control" id='type' name='type' required onChange={setData}>
                        <option value='' selected >Choose Type</option>
                            {
                                typeList.map(e=>{
                                    return <option value={e} >{e}</option>
                                })
                            }

                        </select>

                        </div>
                        <div className="mb-3">
                        <label htmlFor="duration" className="form-label">Duration</label>
                        <input type="number" className="form-control" name='duration' id="duration" value={ getInput.duration} onChange={setData} required placeholder="duration" />
                        </div>
                        <div className="mb-3">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input type="date" className="form-control" id="date" name="date"  value={getInput.date} onChange={setData} />
                        </div>
                    </div>
                    <div className="modal-footer justify-content-center">
                        <button type="submit" className="btn btn-dark" data-bs-dismiss="modal" >Add Activity</button>
                    </div>
                </form>
              </div>
            </div>
        </div>
    )
}
export default Modal