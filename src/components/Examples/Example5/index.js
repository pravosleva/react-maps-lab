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
// import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import { updateActiveMarkerKey, updateMapCenter } from '../../../actions';


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

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDvWOdmtDGOybXpF7XEdixoIImLcCDTzdQ",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withHandlers(() => ({
    mapMoved: (props) => async () => {
      console.clear();
      await specialLog('Map moved. props in HOC:', null, [props]);
    },
  })),
  withScriptjs,
  withGoogleMap,
)((props) =>
  <GoogleMap
    defaultZoom={5}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    center={props.mapCenter}
    // onZoomChanged={props.onZoomChanged}
    onDragEnd={props.mapMoved}
  >
    {
      [{ lat: -34.397, lng: 150.644 }].map((marker) => {
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
                    <em>Something else...</em>
                  </InfoWindowWrapper>
                </InfoWindow>
              ) : null
            }
          </Marker>
        )
      })
    }
  </GoogleMap>
);

class MyFancyComponent extends React.PureComponent {
  state={
    items: this.props.items.map((e) => ({
      ...e,
      markerKey: Math.random(),
    })),
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
  // onZoomChange = (arg) => {
  //   console.log(arg);
  // }

  render() {
    return (
      <MyMapComponent
        onMarkerClick={this.handleMarkerClick}
        onCloseClick={this.onCloseClick}
        items={this.state.items}
        activeMarkerKey={this.props.activeMarkerKey}
        resetActiveMarkerKey={this.resetActiveMarkerKey}
        mapCenter={this.props.mapCenter}
        // onZoomChange={this.onZoomChange}
      />
    )
  }
};

export const Example5 = connect(mapState)(compose(MyFancyComponent));
