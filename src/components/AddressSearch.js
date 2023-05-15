import React, { useState, useRef } from 'react';
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px'
  };
  

const AddressSearch = () => {
    const [center, setCenter] = useState({ lat: 38.9934546062374, lng: -94.66833797427655 });

    const libraries = ["places"];

    const autocomplete = useRef(null);

    const options = {
      types:  ['geocode'], 
      componentRestrictions: { country: 'us' }
    }

    const onLoad = (autocompleteInstance) => {
      autocomplete.current = autocompleteInstance;
    };
  
    const onPlaceChanged = () => {
      const place = autocomplete.current.getPlace();
      if (place && place.geometry) {
        // La ubicación está dentro de los límites de Estados Unidos, puedes procesarla
        let geometry = place.geometry;
        
        let northeast = geometry.viewport.getNorthEast();
        let southwest = geometry.viewport.getSouthWest();

        console.log(place);
        
      } else {
        // La ubicación está fuera de los límites de Estados Unidos, muestra un mensaje de error o realiza alguna acción apropiada
        console.log("La ubicación seleccionada está fuera de los límites de Estados Unidos.");
      }
    };
    
  
    return (
        <LoadScript googleMapsApiKey="AIzaSyDKM9LeewUilY6I1J09V8HAO1rC_H8ja0U" libraries={libraries}>
        <GoogleMap
            center={center}
            mapContainerStyle={containerStyle}
            zoom={10}>
            <Autocomplete 
               onLoad={onLoad}
                onPlaceChanged={
                  onPlaceChanged
                }
                options = {options}
                >
                <input
                type="text"
                placeholder="Buscar dirección"
                style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `32px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                    position: "absolute",
                    left: "50%",
                    marginLeft: "-120px"
                  }}
                 />
            </Autocomplete>
        </GoogleMap>
      </LoadScript>
    );
  };
  
  export default AddressSearch;
  