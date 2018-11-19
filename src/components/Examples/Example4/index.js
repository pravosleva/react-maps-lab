import React from 'react';
import { connect } from 'react-redux';
import { compose, withProps, withHandlers } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import styled from 'styled-components';
import { specialLog } from '../specialLog'; // specialLog('look', null, ['tst']);
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import { updateActiveMarkerKey } from '../../../actions';
import withGoogleMapApiKey from '../withGoogleMapApiKey';


const mapState = ({ markers, dispatch }) => ({
  items: markers.items,
  activeMarkerKey: markers.activeMarkerKey,
  dispatch,
});

const InfoWindowWrapper = styled('div')`
    /* border: 1px solid gray; */
  padding: 10px;
`;
const InfoHeader = styled('h1')`
  margin: 0;
  color: rgb(0, 185, 255);
  font-size: 18px;
  font-weight: 600;
`;
const clusterStyles = [
  {
    fontFamily: 'Montserrat',
    textColor: 'white',
    textSize: 16,
    url: 'img/map/m1.png',
    height: 30,
    width: 30,
  },
  {
    fontFamily: 'Montserrat',
    textColor: 'white',
    textSize: 16,
    url: 'img/map/m2.png',
    height: 36,
    width: 36,
  },
  {
    fontFamily: 'Montserrat',
    textColor: 'white',
    textSize: 16,
    url: 'img/map/m3.png',
    height: 42,
    width: 42,
  },
  {
    fontFamily: 'Montserrat',
    textColor: 'white',
    textSize: 16,
    url: 'img/map/m4.png',
    height: 54,
    width: 54,
  },
  {
    fontFamily: 'Montserrat',
    textColor: 'white',
    textSize: 16,
    url: 'img/map/m5.png',
    height: 60,
    width: 60,
  },
];

const refs = { map: {} }; // Antipattern too (Example 5 is better!)

const MyMapComponent = compose(
  withProps((p) => ({
    googleMapURL: (() => `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${p.apiKey}`)(),
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  })),
  withHandlers(() => ({
    onMapLoaded: () => (ref) => {
      refs.map = ref;
    },
    onMarkerClustererClick: () => async (arg) => {
      await specialLog('HOC | onMarkerClustererClick: () => (arg) => {}\narg.getMarkers ()', null, [arg.getMarkers()]);
    },
    mapMoved: (props) => async () => {
      console.clear();
      await specialLog('HOC | mapMoved: (props) => () => {}\nprops', null, [props]);
    },
  })),
  withScriptjs,
  withGoogleMap,
)((props) =>
  <GoogleMap
    ref={props.onMapLoaded}
    defaultZoom={5}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    // center={props.mapCenter}
    // zoom={props.zoom}
    onZoomChanged={async () => {
      await specialLog('onZoomChanged: () => {}\nrefs.map.getZoom ()', null, [refs.map.getZoom()]);
    }}
    onChangeMapCenter={props.onChangeMapCenter}
    onDragEnd={props.mapMoved}
    disableDefaultUI
    defaultOptions={{
      // these following 7 options turn certain controls off
      streetViewControl: false,
      scaleControl: false,
      mapTypeControl: false,
      panControl: false,
      zoomControl: true,
      rotateControl: false,
      fullscreenControl: false,
    }}
  >
    <MarkerClusterer
      onClick={(arg) => props.resetActiveMarkerKey().then(() => props.onMarkerClustererClick(arg))}
      averageCenter
      enableRetinaIcons
      styles={props.clusterStyles}
      // imagePath='img/map/m'
      gridSize={100}
      minimumClusterSize={2}
    >
    {
      props.items.map((marker) => {
        const onClick = () => props.onMarkerClick(marker);
        const onCloseClick = () => props.onCloseClick(marker);

        return (
          <Marker
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={onClick}
            icon='/img/map/marker-24px.png'
            key={marker.markerKey || Math.random()}
          >
            {
              (props.activeMarkerKey === marker.markerKey)
              ? (
                <InfoWindow onCloseClick={onCloseClick}>
                  <InfoWindowWrapper>
                    <InfoHeader>hello world, mf</InfoHeader>
                    <code style={{ lineHeight: '35px' }}>{marker.lat}, {marker.lng}</code><br />
                    <code>{marker.description}</code>
                    <hr className='style-two' />
                    <em>Something else...</em>
                  </InfoWindowWrapper>
                </InfoWindow>
              ) : null
            }
          </Marker>
        )
      })
    }
    </MarkerClusterer>
  </GoogleMap>
);

class MyFancyComponent extends React.Component {
  state={
    items: this.props.items.map((e) => ({
      ...e,
      markerKey: Math.random(),
      description: 'bla bla bla'.repeat(50),
    })),
    // zoom: 20,
  }

  // static getDerivedStateFromProps(props, state) {
  //   // Any time the current user changes,
  //   // Reset any parts of state that are tied to that user.
  //   // In this simple example, that's just the email.
  //
  //   if (props.items[0].lat !== state.items[0].lat) {
  //     return {
  //       items: props.items.map((e) => ({
  //         ...e,
  //         markerKey: Math.random(),
  //         description: 'bla bla bla', // .repeat(50),
  //       })),
  //       // zoom: 20,
  //     };
  //   }
  //   return null;
  // }

  handleMarkerClick = async (marker) => {
    await this.props.dispatch(updateActiveMarkerKey(marker.markerKey));
    // await this.props.dispatch(updateMapCenter({ lat: marker.lat, lng: marker.lng }));
  }
  onCloseClick = async (marker) => {
    await this.props.dispatch(updateActiveMarkerKey('nothing'));
  }
  resetActiveMarkerKey = () => {
    this.props.dispatch(updateActiveMarkerKey('nothing'));
    return Promise.resolve();
  }
  // onChangeZoom = (zoom) => this.setState({ zoom })
  onChangeMapCenter = (arg) => console.log(arg)

  render() {
    return (
      <MyMapComponent
        {...this.props}
        onMarkerClick={this.handleMarkerClick}
        onCloseClick={this.onCloseClick}
        items={this.state.items}
        activeMarkerKey={this.props.activeMarkerKey}
        resetActiveMarkerKey={this.resetActiveMarkerKey}
        // mapCenter={this.props.mapCenter}
        clusterStyles={clusterStyles}
        // onChangeZoom={this.onChangeZoom}
        onChangeMapCenter={this.onChangeMapCenter}
        // zoom={this.state.zoom}
      />
    )
  }
};

export const Example4 = compose(
  withGoogleMapApiKey,
  connect(mapState),
)(MyFancyComponent);
