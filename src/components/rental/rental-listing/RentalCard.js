import React from 'react'
import {Link} from "react-router-dom"

 const RentalCard=(props) => {
   const rental = props.rental
  return (
    <div className='col-md-3 col-xs-6'>
    <Link className="rental-detail-link" to ={`/rentals/${rental.id}`}>
   
        <div className='card bwm-card'>
          <img className='card-img-top' src={rental.image} alt='rental main image'></img>
          <div className='card-block'>
            <h6 className={`card-subtitle & ${rental.category}`}>{rental.shared ?'shared':'whole'} {rental.category} {rental.city}</h6>
            <h4 className='card-title'>{rental.title}</h4>
            <p className='card-text'>{rental.dailyRate} per Night &#183; Free Cancelation</p>
            <a href='' className='card-link'>More Info</a>
          </div>
        </div>
        </Link>
      </div>
      

  )
}


export default RentalCard