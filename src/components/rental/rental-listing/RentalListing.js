import React, { Component } from 'react'

import {connect} from "react-redux"
import {fetchRentals} from "../../../actions"
import RentalList from "./RentalList"

class RentalListing extends Component {
   componentWillMount () {
     this.props.fetchRentals()
   }
    
    
  render() {
    return (
        <section id="rentalListing">
        <h1 className="page-title">Your Home All Around the World</h1>
       :
        <RentalList rentals={this.props.rentals} />
      </section>
 
    
         
      
    )
  }
}

function mapStateToProps(state){
    return{
    rentals:state.rentals.data
    }
}


export default connect(mapStateToProps,{fetchRentals})(RentalListing)
