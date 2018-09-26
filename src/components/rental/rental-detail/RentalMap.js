import React, { Component } from 'react'
import {MapWithGeocode} from "../../map/GoogleMap"

 class RentalMap extends Component {
  render() {
      const location = this.props.location
     
    return (
        <MapWithGeocode
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD3eYRJ80ZfMd7D_0iAmvoDUQXjx2N6iR0&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `360px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        location={location}
      />
    )
  }
}

export default RentalMap
