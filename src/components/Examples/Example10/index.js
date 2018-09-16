import React from 'react';
import {
  // compose, withProps, withHandlers,
  withStateHandlers,
  lifecycle,
} from 'recompose'; // , withState,
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';

import { compose, withProps } from 'recompose';
import { withScriptjs } from 'react-google-maps';
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';

import { updateExample10SearchBox } from '../../../actions';


// https://developers.google.com/maps/documentation/geolocation/intro

const WrapperContainer = styled('div')`
  height: calc(100vh);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
`;

const WrapperElement = styled('div')`
  margin: auto;
  max-width: 550px;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const apiKey = 'AIzaSyDvWOdmtDGOybXpF7XEdixoIImLcCDTzdQ'; // AIzaSyCYfaJm84V9DuaghwTZLaP_KPcUJxgrD__

const PlacesWithStandaloneSearchBox = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();

          this.setState({
            places,
          }, () => console.log(places));
        },
      })
    },
  }),
  withScriptjs
)(props =>
  <WrapperContainer>
    <WrapperElement data-standalone-searchbox="">
      <StandaloneSearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        onPlacesChanged={props.onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Enter anything"
          style={{
            boxSizing: 'border-box',
            border: '1px solid transparent',
            width: '100%',
            textAnign: 'center',
            height: '32px',
            padding: '0 12px',
            borderRadius: '4px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
            fontSize: '14px',
            outline: 'none',
            textOverflow: 'ellipses',
          }}
        />
      </StandaloneSearchBox>
      <ul style={{ padding: '0', listStyleType: 'none' }}>
        {
          props.places.map(({ place_id, formatted_address, name }) =>( // , geometry: { location }
            <li key={`${Math.random()}`}>
              {/* {name || 'Nameless'}<br /> */}
              {formatted_address || `formatted_address is ${String(formatted_address)}`}
              {/* " at " */}
              {/* ({location.lat()}, {location.lng()}) */}
            </li>
          ))
        }
      </ul>

    </WrapperElement>
  </WrapperContainer>
);

// const mapState = ({ example9 }) => ({
//   apiKey: example9.apiKey,
// });

export const Example10 = PlacesWithStandaloneSearchBox;
