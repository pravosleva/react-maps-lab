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
import { specialLog } from '../specialLog';
// specialLog('look', null, ['tst']);
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import { updateActiveMarkerKey, updateMapCenter } from '../../../actions';
import NoSSR from 'react-no-ssr';


const mapState = ({ markers, dispatch }) => ({
  items: markers.items,
  activeMarkerKey: markers.activeMarkerKey,
  mapCenter: markers.mapCenter,
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
    textColor: 'white',
    textSize: 16,
    url: 'img/map/m1.png',
    height: 30,
    width: 30,
  },
  {
    textColor: 'white',
    textSize: 16,
    url: 'img/map/m2.png',
    height: 36,
    width: 36,
  },
  {
    textColor: 'white',
    textSize: 16,
    url: 'img/map/m3.png',
    height: 42,
    width: 42,
  },
  {
    textColor: 'white',
    textSize: 16,
    url: 'img/map/m4.png',
    height: 54,
    width: 54,
  },
  {
    textColor: 'white',
    textSize: 16,
    url: 'img/map/m5.png',
    height: 60,
    width: 60,
  },
];

const refs = { map: {} };

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDvWOdmtDGOybXpF7XEdixoIImLcCDTzdQ",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withHandlers(() => ({
    onMapLoaded: () => async (ref) => {
      refs.map = ref;
      // await specialLog(
      //   '0) onMapLoaded ()\nmap.getCenter();',
      //   null,
      //   [JSON.stringify(ref.getCenter())],
      // );
    },
    onMarkerClustererClick: () => async (obj) => {
      const clickedMarkers = obj.markerClusterer_.getMarkers();

      await specialLog(
        '1) onMarkerClustererClick ()\nconst clickedMarkers = markerClusterer.getMarkers();',
        null,
        [clickedMarkers],
      );
    },
    mapMoved: (props) => async () => {
      console.clear();
      await specialLog('Map moved. props in HOC:', null, [props]);
    },
  })),
  withScriptjs,
  withGoogleMap,
)((props) =>
  <NoSSR>
    <GoogleMap
      ref={props.onMapLoaded}
      defaultZoom={5}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
      center={props.mapCenter}
      // zoom={props.zoom}
      onZoomChanged={async () => {
        await props.onChangeZoom(refs.map.getZoom());
        // console.log('onZoomChanged ()');
      }}
      onChangeMapCenter={props.onChangeMapCenter}
      onDragEnd={props.mapMoved}
      disableDefaultUI
      defaultOptions={{
        // these following 7 options turn certain controls off see link below
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
                      <em>Something else...</em><br />
                      <code>{marker.description}</code>
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
  </NoSSR>
);

class MyFancyComponent extends React.PureComponent {
  state={
    items: this.props.items.map((e) => ({
      ...e,
      markerKey: Math.random(),
      description: 'bla bla bla'.repeat(50),
    })),
    // zoom: 20,
  }

  handleMarkerClick = async (marker) => {
    await this.props.dispatch(updateActiveMarkerKey(marker.markerKey));
    await this.props.dispatch(updateMapCenter({ lat: marker.lat, lng: marker.lng }));
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
        onMarkerClick={this.handleMarkerClick}
        onCloseClick={this.onCloseClick}
        items={this.state.items}
        activeMarkerKey={this.props.activeMarkerKey}
        resetActiveMarkerKey={this.resetActiveMarkerKey}
        mapCenter={this.props.mapCenter}
        clusterStyles={clusterStyles}
        // onChangeZoom={this.onChangeZoom}
        onChangeMapCenter={this.onChangeMapCenter}
        // zoom={this.state.zoom}
      />
    )
  }
};

export const Example4 = connect(mapState)(compose(MyFancyComponent));
