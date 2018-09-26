import React from "react"
import {Cacher }from "../../services/cacher"

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    Circle,
    InfoWindow
  } from "react-google-maps";

  function MapComponent(props){
      const {coordinates,isError,isLocationLoaded} = props
      return(
        <GoogleMap
        defaultZoom={13}
        defaultCenter={coordinates}
        center={coordinates}
        options={{disableDefaultUI:isError?true:false}}
      >
        {isLocationLoaded &&!isError &&<Circle
        center={coordinates}
          radius = {500}
        />}
        {isLocationLoaded && isError && <InfoWindow position={coordinates} options={{maxwidth:300}}>
            <div>
                there is a problem in finding the location
            </div>
        </InfoWindow>}
      </GoogleMap>

      )
  }

  function withGeocode(WrappedComponent){
    return class extends React.Component{
        constructor(){
            super()
        this.cacher=new Cacher()
        this.state={
            coordinates:{
                lat:0,
                lng:0
            },
            isError:false,
            isLocationLoaded:false
        }
    }

        componentWillMount() {
            this.geocodedLocation()
        }

        geocodeLocation(location){
            const geocoder = new window.google.maps.Geocoder()
            return new Promise((resolve,reject)=>{
                geocoder.geocode({address:location},(result,status)=>{
                    if(status==="OK"){
                        const geometry = result[0].geometry.location
                        const coordinates = {lat:geometry.lat(), lng:geometry.lng()}
                        this.cacher.cacheValue(location,coordinates)
                        resolve(coordinates)
                    }
                    else{
                        reject('ERROR!!!')
                    }
                })
            })
        }
        geocodedLocation(){
            const location = this.props.location

            
           
            //if location is cached return cached values
            if(this.cacher.isValueCached(location)){
                this.setState({coordinates:this.cacher.getCachedValue(location),isLocationLoaded:true})

            }
            //else geocode location
            else{
                this.geocodeLocation(location)
                .then((coordinates)=>{
                    this.setState({coordinates,isLocationLoaded:true})
                })
                .catch(error=>this.setState({
                    isError:true,isLocationLoaded:true
                }))
                
            }
            
        }
        render(){
            return(
                <WrappedComponent {...this.state}/>
            )
        }
    }
  }
  
  export const MapWithGeocode = withScriptjs(withGoogleMap(withGeocode(MapComponent)))
  
  

 