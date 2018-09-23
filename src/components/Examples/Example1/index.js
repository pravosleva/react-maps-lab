import React from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import withGoogleMapApiKey from '../withGoogleMapApiKey';


const containerStyles = {
  height: `100vh`,
};

const MyMapComponent = compose(
  withProps((p) => ({
    googleMapURL: (() => `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${p.apiKey}`)(),
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={containerStyles} />,
    mapElement: <div style={{ height: `100%` }} />,
  })),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
)

export const Example1 = withGoogleMapApiKey((ps) => <MyMapComponent isMarkerShown {...ps} />);
