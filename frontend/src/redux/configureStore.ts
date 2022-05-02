import { setUserReducer } from "./reducers/setUserReducer"
import { createStore } from '@reduxjs/toolkit'

export const configureStore = () =>{
    return createStore(setUserReducer)
}