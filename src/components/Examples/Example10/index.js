import React from 'react';
import {
  compose, withProps,
  withHandlers,
  withStateHandlers,
  lifecycle,
} from 'recompose'; // , withState,
import PropTypes from 'prop-types';
import styled, { injectGlobal } from 'styled-components';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import { withScriptjs } from 'react-google-maps';
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import JSONTree from 'react-json-tree';

import {
  RelativeLocationPlaceToDisplayInHeader,
  LocationWrapper,
  LocationIcon,
  LocationLabel,
  LocationPopup,
  PopupContainer,
  LocationArrow,
  PopupText,
  PopupButton,
  Input,
  fadeIn,
} from './components';

import { updateExample10PopupState } from '../../../actions';


// See also:
// https://developers.google.com/maps/documentation/geolocation/intro

injectGlobal`
  .pac-container {
    margin-top: 5px; border-radius: 4px;
    font-family: Montserrat;
    box-shadow: 2px 2px 5px lightgray;
    animation: ${fadeIn} 0.3s ease-in-out;

      /* &::after { content: none; } */
  }
  .pac-item { line-height: 40px; }
  .pac-icon-marker { margin-top: 10px; }
  .pac-item-query { color: #333 }
`;

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
    /* max-width: 600px; */
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
    /* border: 1px dashed red; */

  display: flex;
  flex-direction: column;
  align-items: flex-start;
    /* margin-top: calc(50vh - 100px); */
`;

const theme = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#272822',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#a6e22e',
  base0C: '#a1efe4',
  base0D: '#66d9ef',
  base0E: '#ae81ff',
  base0F: '#cc6633'
};

const apiKey = 'AIzaSyDvWOdmtDGOybXpF7XEdixoIImLcCDTzdQ';
// const apiKey = 'AIzaSyCYfaJm84V9DuaghwTZLaP_KPcUJxgrD__';

const YourPlace = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%' }} />,
  }),
  withHandlers(() => ({
    pressYes: (props) => () => {
      props.dispatch(updateExample10PopupState({ ...props.popupState, open: false }));
    },
    pressNo: (props) => () => {
      props.dispatch(updateExample10PopupState({ ...props.popupState, step: 1 })); // Перейти к выбору города
    },
    close: (props) => () => {
      props.dispatch(updateExample10PopupState({ ...props.popupState, open: false }));
    },
  })),
  // withStateHandlers(
  //   { _places: [] },
  //   {
  //     updatePlaces: ({ _places }, props) => {
  //       console.log(props);
  //
  //       return { _places };
  //     },
  //   },
  // ),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        _places: [],
        onSearchBoxMounted: ref => { refs.searchBox = ref; },
        onPlacesChanged: () => {
          const _places = refs.searchBox.getPlaces();

          console.clear();
          console.log(_places);

          this.setState({ _places }, () => this.props.dispatch(updateExample10PopupState({ ...this.props.popupState, selectedPlace: _places[0] })));
        },
      });
      setTimeout(() => this.props.dispatch(updateExample10PopupState({ ...this.props.popupState, open: true })), 1000);
    },
  }),
  withScriptjs
)((props) => (
  <WrapperContainer>
    <WrapperElement>
      <RelativeLocationPlaceToDisplayInHeader>
        <LocationWrapper onClick={() => props.dispatch(updateExample10PopupState({ ...props.popupState, open: true, step: 1 }))}>
          <LocationIcon>
            <svg width="18" height="25" viewBox="0 0 18 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.79175 5.2041C6.51375 5.2041 4.66675 7.0541 4.66675 9.3291C4.66675 11.6091 6.51375 13.4541 8.79175 13.4541C11.0697 13.4541 12.9167 11.6091 12.9167 9.3291C12.9167 7.0541 11.0697 5.2041 8.79175 5.2041ZM8.79163 6.7041C10.2391 6.7041 11.4166 7.8841 11.4166 9.3291C11.4166 10.7791 10.2391 11.9541 8.79163 11.9541C7.34413 11.9541 6.16663 10.7791 6.16663 9.3291C6.16663 7.8841 7.34413 6.7041 8.79163 6.7041Z" fill="#0399D0" />
              <path d="M8.792 2.53906C5.047 2.53906 2 5.58906 2 9.32906C2 10.6241 2.364 11.8791 3.0525 12.9641L8.792 21.7141L14.5355 12.9591C15.2215 11.8741 15.5835 10.6241 15.5835 9.32906C15.5835 5.58906 12.537 2.53906 8.792 2.53906ZM8.792 24.5391C8.455 24.5391 8.1405 24.3691 7.956 24.0891L1.372 14.0491C0.472 12.6341 0 11.0041 0 9.32906C0 4.48406 3.944 0.539062 8.792 0.539062C13.64 0.539062 17.5835 4.48406 17.5835 9.32906C17.5835 11.0041 17.112 12.6341 16.2195 14.0391C16.2175 14.0391 16.2145 14.0441 16.212 14.0491L9.628 24.0891C9.4435 24.3691 9.129 24.5391 8.792 24.5391Z" fill="#0399D0" />
            </svg>
          </LocationIcon>
          <LocationLabel>
            {
              props.popupState.selectedPlace
              ? (
                props.popupState.selectedPlace.formatted_address
                ? <span>{props.popupState.selectedPlace.formatted_address}</span>
                : (
                  props.popupState.selectedPlace.name
                  ? props.popupState.selectedPlace.name
                  : <span>Локация не определена</span>
                )
              ) : <span>Локация не определена</span>
            }
          </LocationLabel>
        </LocationWrapper>
        {
          props.popupState.open && props.popupState.step === 0 && ( // Вы в Москве?
            <LocationPopup>
              <PopupContainer>
                <LocationArrow />
                <LocationIcon>
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.70097 12.2627C8.33297 12.2627 8.0343 11.966 8.0343 11.596V7.38932C8.0343 7.01932 8.33297 6.72266 8.70097 6.72266C9.06897 6.72266 9.36764 7.01932 9.36764 7.38932V11.596C9.36764 11.966 9.06897 12.2627 8.70097 12.2627Z" fill="#0399D0" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.8678 4.88997C7.8678 4.42997 8.2408 4.05664 8.70113 4.05664C9.16146 4.05664 9.53446 4.42997 9.53446 4.88997C9.53446 5.34997 9.16146 5.72331 8.70113 5.72331C8.2408 5.72331 7.8678 5.34997 7.8678 4.88997Z" fill="#0399D0" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.70097 1.49316C5.02497 1.49316 2.0343 4.48316 2.0343 8.15983C2.0343 11.8365 5.02497 14.8265 8.70097 14.8265C12.377 14.8265 15.3676 11.8365 15.3676 8.15983C15.3676 4.48316 12.377 1.49316 8.70097 1.49316ZM8.70105 16.1592C4.28972 16.1592 0.70105 12.5692 0.70105 8.15918C0.70105 3.74918 4.28972 0.15918 8.70105 0.15918C13.1124 0.15918 16.701 3.74918 16.701 8.15918C16.701 12.5692 13.1124 16.1592 8.70105 16.1592Z" fill="#0399D0" />
                  </svg>
                </LocationIcon>

                <PopupText>
                  Вы действительно находитесь в Москве?
                </PopupText>

                <PopupButton onClick={props.pressYes}>
                  <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.869751 6.55921L5.3142 11.374L14.2031 1.37402" stroke="#0399D0" strokeWidth="2" />
                  </svg>
                </PopupButton>
                <PopupButton onClick={props.pressNo}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.37604 1.37402L11.376 11.374M1.37604 11.374L11.376 1.37402" stroke="#0399D0" strokeWidth="2" />
                  </svg>
                </PopupButton>

              </PopupContainer>
            </LocationPopup>
          )
        }
        {
          props.popupState.open && props.popupState.step === 1 && ( // Выбор города
            <LocationPopup
              bottomOffsetValue='20px'
              desktopMinWidth='490px'
              desktopMinHeight='196px'
              desktopPadding='20px'
            >{/* bottomOffsetValue='-95px' */}
              <PopupButton onClick={props.close} absoluteRightTop>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.37604 1.37402L11.376 11.374M1.37604 11.374L11.376 1.37402" stroke="#0399D0" strokeWidth="2" />
                </svg>
              </PopupButton>
              <PopupContainer>
                <StandaloneSearchBox
                  ref={props.onSearchBoxMounted}
                  // bounds={props.bounds}
                  onPlacesChanged={props.onPlacesChanged}
                >
                  <Input
                    // invalid={!!props.error}
                    type='text'
                    placeholder="Введите название города"
                    defaultValue={
                      props.popupState.selectedPlace
                      ? (
                        props.popupState.selectedPlace.formatted_address
                        ? props.popupState.selectedPlace.formatted_address
                        : (
                          props.popupState.selectedPlace.name
                          ? props.popupState.selectedPlace.name
                          : ''
                        )
                      ) : ''
                    }
                  />
                </StandaloneSearchBox>
              </PopupContainer>
            </LocationPopup>
          )
        }
      </RelativeLocationPlaceToDisplayInHeader>
      {
        props.popupState.selectedPlace && (
          <div style={{ overflowY: 'auto', width: '100%', boxShadow: '0px 0px 5px lightgray', marginTop: '10px', padding: '20px', boxSizing: 'border-box' }}>
            <JSONTree
              data={props.popupState.selectedPlace}
              theme={theme}
              invertTheme
            />
          </div>
        )
      }
    </WrapperElement>
  </WrapperContainer>
));

const mapState = ({ example10, dispatch }) => ({
  popupState: example10.popupState,
  dispatch,
});

export const Example10 = connect(mapState)(YourPlace);
