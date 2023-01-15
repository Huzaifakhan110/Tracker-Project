import { configureStore } from "@reduxjs/toolkit";
import value from "./reduxReducer/activityReducer"

const store = configureStore({
    reducer:{

        activityData : value,
    }
})
export default store;