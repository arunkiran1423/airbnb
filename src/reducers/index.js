import {combineReducers} from "redux"
import {rentalReducer,selectedRental} from "./rentalReducer"

export const rootReducer=combineReducers({
    rentals:rentalReducer,
    rental:selectedRental
})