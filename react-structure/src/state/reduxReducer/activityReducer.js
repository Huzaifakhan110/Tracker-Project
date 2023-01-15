import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const insertData =  createAsyncThunk('activity/insertData', 
    async (data, thunkAPI) => {
        const userData = {
            method: "post",
            headers: {
                'Content-Type':'application/json'
            },
            body : JSON.stringify(data)
        }
        const response =  await fetch('http://localhost:2929/addActivity',userData);
        return response.json();
    }
)

export const updateDataAPI =  createAsyncThunk('activity/updateDataAPI', 
    async (data, thunkAPI) => {
        console.log("data from thunk API",data)
        const userData = {
            method: "post",
            headers: {
                'Content-Type':'application/json'
            },
            body : JSON.stringify(data)
        }
        const response =  await fetch('http://localhost:2929/updateActivity/'+data._id,userData);
        return response.json();
    }
)

export const getActivities = createAsyncThunk('activity/getActivities', async () => {
    const response = await fetch('http://localhost:2929');
    const result = await response.json();
    return result;
})

export const deleteActivity = createAsyncThunk('activity/deleteActivity', async (data) => {
    const response = await fetch(`http://localhost:2929/removeActivity/${data.databaseId}`);
    const deleteData = await response.json();
    deleteData.stateId = data.stateId;
    return deleteData;
});

const initialState = {
    data : [],
    status : 'idle',
    error : null
}

const getActivity = createSlice({
    name : "activity",
    initialState,
    reducers:{
        addData:(state,action)=>{
            console.log('from reducer',action.payload)
            state.data.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(insertData.pending, (state, action) => {
                state.action = 'pending';
            })
            .addCase(insertData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if(action.payload.insertedUser){
                    state.data.push(action.payload.insertedUser);
                }else{
                    alert(action.payload.message);
                }
            })
            .addCase(insertData.rejected, (state, action) => {
                state.error = 'failed';
            })
            //update activity 

            .addCase(updateDataAPI.pending, (state, action) => {
                state.action = 'pending';
            })
            .addCase(updateDataAPI.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if(action.payload.message){
                    console.log(action.payload)
                    // state.data.push(action.payload.insertedUser);
                }else{
                    console.log(action.payload.error);
                }
            })
            .addCase(updateDataAPI.rejected, (state, action) => {
                state.error = 'failed';
            })

            //get activities

            .addCase(getActivities.pending, (state, action) => {
                state.action = 'pending';
            })
            .addCase(getActivities.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if(action.payload.activities){
                    // console.log(action.payload.activities)
                    state.data = action.payload.activities
                }else{
                    alert(action.payload.error);
                }
            })
            .addCase(getActivities.rejected, (state, action) => {
                state.error = 'failed';
            })

            //Delete activity
            
            .addCase(deleteActivity.pending, (state, action) => {
                state.action = 'pending';
            })
            .addCase(deleteActivity.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if(action.payload.message){
                    state.data.splice(action.payload.stateId,1);
                    state.data = [...state.data];
                }else{
                    alert(action.payload.error);
                }
            })
            .addCase(deleteActivity.rejected, (state, action) => {
                state.error = 'failed';
            })
    }
});
export const {addData} = getActivity.actions;
export default getActivity.reducer;