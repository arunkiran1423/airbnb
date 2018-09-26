import axios from "axios"

import {FETCH_RENTALS_SUCCESS, FETCH_RENTAL_BY_ID_SUCCESS,FETCH_RENTAL_BY_INIT} from "./types"



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

const fetchRentalByInit=()=>{
    return{
        type:FETCH_RENTAL_BY_INIT
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
    return dispatch=>{
        dispatch(fetchRentalByInit())
        axios.get(`/api/v1/rentals/${rentalId}`)
        .then(res=>res.data)
        .then(rental =>dispatch(fetchRentalByIdSuccess(rental)))

    }

        
   }

