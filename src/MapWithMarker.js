import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import { Component } from 'react';
import { usePapaParse } from 'react-papaparse';
import MarkerClusterer from '@googlemaps/markerclustererplus';

const handleApiLoaded = (map, maps, data) => {

    let markers = data && data.map((location) => {
      console.log(parseFloat( location[18] ))
      console.log(parseFloat( location[19] ))
      return new maps.Marker({position:{
        lat : parseFloat( location[18] ),
        lng : parseFloat( location[19] )
      },
      icon: {
        size: new maps.Size(20, 20),
        scaledSize: new maps.Size(20, 20),
        url: "./pin.png"
      }
    })
    })
    let markerCluster = new MarkerClusterer(map, markers, {
      imagePath:"https://raw.githubusercontent.com/googlemaps/v3-utility-library/master/markerclustererplus/images/m",
      gridSize: 40,
      minimumClusterSize: 2
    })
};

function SimpleMap(props){
  const center = { lat: 34.0207669, lng: -118.3031356 };
  const { readRemoteFile } = usePapaParse();
  var [data, setData] = useState([]);
  readRemoteFile("./last_day.csv", {
    complete: (results) => {
      if(data.length == 0){
        setData(results["data"]);
        data = results["data"];
        console.log(data);
      }
    },
  });
  //const [center, setCenter] = useState({lat: 11.0168, lng: 76.9558 });
  //const [zoom, setZoom] = useState(11);
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      
      <GoogleMapReact
      defaultCenter={center}
      defaultZoom={11}
      bootstrapURLKeys={{ key: "AIzaSyD2gqS7WqzU39nQ0FTd-T1ZV8bpRuj-_Ns" }}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) => {
        handleApiLoaded(map, maps, data);
      }}
      options={{ streetViewControl: true }}
    />
      
    </div>
  );
}

export default SimpleMap
