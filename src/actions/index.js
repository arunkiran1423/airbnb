import axios from "axios"

import {FETCH_RENTALS_SUCCESS, FETCH_RENTAL_BY_ID_SUCCESS} from "./types"



const fetchRentalsSuccess = rentals=>{
    return{
        type:FETCH_RENTALS_SUCCESS,
        rentals
    }
}

const fetchRentalByIdSuccess = rental =>{
    return{
        type:FETCH_RENTAL_BY_ID_SUCCESS,
        rental
    }
}


   export const fetchRentals=()=>{
       return dispatch=>{
           axios.get("/api/v1/rentals")
           .then(res=>res.data)
           .then(rentals=>dispatch(fetchRentalsSuccess(rentals)))
       }
      

   }

   export const fetchRentalById=(rentalId)=>{
    //server call
    return function(dispatch){
        axios.get("/api/v1/rentals/:id")
        .then(res=>res.data)
        .then(rental =>dispatch(fetchRentalByIdSuccess(rental)))

    }

        
   }

