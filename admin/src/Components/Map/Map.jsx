import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 31.377456,  
  lng: 77.155623, 
};

const Map = () => {
  return (
    <>
    <h1>Gupta Traders</h1>
    <div>
    <LoadScript googleMapsApiKey="AIzaSyBFOd44ec704YtNgdX7Qv11aB4GsYDCkVo">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
    </div>
    </>
  );
};

export default Map;




