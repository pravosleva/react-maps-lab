import React from 'react';
import {
  // compose, withProps,
  withHandlers,
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
  padding: 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const apiKey = 'AIzaSyDvWOdmtDGOybXpF7XEdixoIImLcCDTzdQ';
// const apiKey = 'AIzaSyCYfaJm84V9DuaghwTZLaP_KPcUJxgrD__';

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

          console.clear();
          console.log(places);

          this.setState({ places }, () => this.props.dispatch(updateExample10SearchBox({ ...this.props.searchBox, places })));
        },
      })
    },
  }),
  // withStateHandlers(
  //   { places: [] },
  //   {
  //     updatePlaces: ({ places }, props) => (arg) => {
  //       // console.log(arg);
  //       return { places };
  //     },
  //   }
  // ),
  // withHandlers(() => ({
  //   onPlacesChanged: (props) => (arg) => {
  //     console.log(props);
  //   },
  // })),
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
            // textAlign: 'center',
            // height: '32px',
            padding: '10px 25px',
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
          props.searchBox.places.map((place) => { // , geometry: { location }
            const { place_id, formatted_address, name, address_components } = place;

            return (
              <li key={`${Math.random()}`}>
                {/* {name || 'Nameless'}<br /> */}
                {/* formatted_address || `formatted_address is ${String(formatted_address)}` */}
                {/* " at " */}
                {/* ({location.lat()}, {location.lng()}) */}
                <strong>This place has {Object.keys(place).length} props</strong>
                {
                  Object.keys(place).length > 0
                  ? <ol>
                    {
                      Object.keys(place).map((e) => <li key={Math.random()}><code>{e}</code></li>)
                    }
                  </ol>
                  : <code>No props</code>
                }
                {/*
                  address_components && address_components.length
                  ? (
                    <ul>
                      {
                        address_components.map((e) => {
                          <li>{e.long.name}</li>
                        })
                      }
                    </ul>
                  ) : null
                */}
              </li>
            )
          })
        }
      </ul>

    </WrapperElement>
  </WrapperContainer>
);

const mapState = ({ example10, dispatch }) => ({
  searchBox: example10.searchBox,
  dispatch,
});

export const Example10 = connect(mapState)(PlacesWithStandaloneSearchBox);
