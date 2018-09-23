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
  specialKey: markers.specialKey,
});

const InfoWindowWrapper = styled('div')`
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
    url: 'img/map/m1.svg',
    height: 30,
    width: 30,
  },
  {
    fontFamily: 'Montserrat',
    textColor: 'white',
    textSize: 16,
    url: 'img/map/m2.svg',
    height: 36,
    width: 36,
  },
  {
    fontFamily: 'Montserrat',
    textColor: 'white',
    textSize: 16,
    url: 'img/map/m3.svg',
    height: 42,
    width: 42,
  },
  {
    fontFamily: 'Montserrat',
    textColor: 'white',
    textSize: 16,
    url: 'img/map/m4.svg',
    height: 54,
    width: 54,
  },
  {
    fontFamily: 'Montserrat',
    textColor: 'white',
    textSize: 16,
    url: 'img/map/m5.svg',
    height: 60,
    width: 60,
  },
];

const MyMapComponent = compose(
  withProps((p) => ({
    googleMapURL: (() => `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${p.apiKey}`)(),
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  })),
  withHandlers(() => ({
    onMapLoaded: (props) => async (ref) => {
      await props.onMapLoaded(ref);
    },
    onMarkerClustererClick: (props) => (arg) => {
      // specialLog('HOC | onMarkerClustererClick: () => (arg) => {}\narg.getMarkers ()', null, [arg.getMarkers()]);
      // props.handleClustererClick(arg);
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
    defaultZoom={3}
    defaultCenter={{ lat: Number(props.items[0].lat), lng: Number(props.items[0].lng) }}
    onZoomChanged={async () => {
      await specialLog('onZoomChanged: () => {}\nrops.map.getZoom ()', null, [props.map.getZoom()]);
    }}
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
    options={{
      minZoom: 2, // UI settings
      maxZoom: 18, // UI settings
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
      key={props.specialKey}
      maxZoom={17} // Markers will be drawed separately up to val= 17
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

class MyFancyComponent extends React.PureComponent {
  state={
    items: this.props.items.map((e) => ({
      ...e,
      markerKey: Math.random(),
      description: 'bla bla bla'.repeat(50),
    })),
    map: null,
  }

  onMapLoaded = (map) => {
    if (this.state.map) {
      return;
    }
    this.setState({ map });
  }
  handleMarkerClick = async (marker) => {
    await this.props.dispatch(updateActiveMarkerKey(marker.markerKey));
    this.state.map.panTo({ lat: marker.lat, lng: marker.lng });
  }
  // handleClustererClick = function(clstr) {
  //   console.log(clstr.getMarkers());
  // }
  onCloseClick = async (marker) => {
    await this.props.dispatch(updateActiveMarkerKey('nothing'));
  }
  resetActiveMarkerKey = () => {
    this.props.dispatch(updateActiveMarkerKey('nothing'));
    return Promise.resolve();
  }

  // WAY 1
  // https://www.youtube.com/watch?v=p_m4TrYGtCo
  // I'm using hoc.state because objects doesn't have repsonal id
  componentWillReceiveProps(nextProps) {
    if (nextProps.items.length !== this.state.items.length) {
      this.setState({
        items: nextProps.items.map((e) => ({
          ...e,
          markerKey: Math.random(),
          description: 'bla bla bla'.repeat(50),
        })),
      });
    }
  }
  // BUT DEPRECATED in React 16.3

  // WAY 2
  // https://habr.com/post/353328/
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   return {
  //     ...prevState,
  //     items: nextProps.items.map((e) => ({
  //       ...e,
  //       markerKey: Math.random(),
  //       description: 'bla bla bla'.repeat(50),
  //     })),
  //   };
  // }
  // READ MORE ABOUT
  // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html

  render() {
    return (
      <MyMapComponent
        {...this.props}
        onMapLoaded={this.onMapLoaded}
        map={this.state.map}
        onMarkerClick={this.handleMarkerClick}
        onCloseClick={this.onCloseClick}
        items={this.state.items}
        activeMarkerKey={this.props.activeMarkerKey}
        resetActiveMarkerKey={this.resetActiveMarkerKey}
        clusterStyles={clusterStyles}
        specialKey={this.props.specialKey}
        // handleClustererClick={this.handleClustererClick}
      />
    )
  }
};

export const Example5 = withGoogleMapApiKey(connect(mapState)(MyFancyComponent));
