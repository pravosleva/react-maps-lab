import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import styled from 'styled-components';
/*
  FAB EXAMPLES:
  https://codepen.io/ruslan_khomiak/pen/QGmwMP
  https://codepen.io/kylelavery88/pen/pjeJvb
*/

const containerStyles = {
  height: '100%',
  width: '100%',
  position: 'relative',
};
const Fab = styled('button')`
  width: 56px;
  height: 56px;
  position: absolute;
  border-radius: 50%;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
  background-color: #29B6F6;
  color: white;
`;
const ListDesktopToggler = styled(Fab)`
  top: 16px;
  right: 16px;
  z-index: 4;
  @media(min-width: 768px){display: none;}
  outline: none;
`;
const SidebarToggler = styled(Fab)`
  top: calc(32px + 56px);
  right: 16px;
  z-index: 4;
  @media(min-width: 768px){display: none;}
  outline: none;
`;

const Compt = compose(
  withProps((p) => ({
    googleMapURL: (() => `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${p.apiKey}`)(),
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={containerStyles} />,
    mapElement: <div style={{ height: '100%', width: '100%' }} />,
  })),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    defaultOptions={{
      // these following 7 options turn certain controls off see link below
      streetViewControl: false,
      scaleControl: false,
      mapTypeControl: false,
      panControl: false,
      zoomControl: false,
      rotateControl: false,
      fullscreenControl: false
    }}
    disableDefaultUI
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
    <ListDesktopToggler onClick={() => props.listToggler()}>
      <i className='fa fa-list' style={{ fontSize: '30px' }} />
    </ListDesktopToggler>
    <SidebarToggler onClick={() => props.sidebarToggler()}>
      <i className='fa fa-gear' style={{ fontSize: '30px' }} />
    </SidebarToggler>
  </GoogleMap>
);

Compt.propTypes = {
  listToggler: PropTypes.func.isRequired,
};
// Compt.defaultProps = {
//   listDesktopToggler: () => {},
// };

export default Compt;
