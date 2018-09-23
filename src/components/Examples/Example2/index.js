import React from 'react';
import { connect } from 'react-redux';
import { compose, withProps, withHandlers } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import Geo from './Geo';
import { updateUserGeoParams } from '../../../actions';
import { specialLog } from '../specialLog'; // USAGE: specialLog('look', null, ['tst']);
import withGoogleMapApiKey from '../withGoogleMapApiKey';


const mapState = ({ userGeoParams, dispatch }) => ({
  userGeoParams,
  dispatch,
});

const refs = { map: {} };

const MyMapComponent = (
  connect(mapState)(compose(
    withProps((p) => ({
      googleMapURL: (() => `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${p.apiKey}`)(),
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `100vh` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    })),
    withHandlers(() => ({
      onMapMounted: () => (ref) => {
        refs.map = ref;
      },

      /* COULD BE HELPFUL */
      // onMarkerClustererClick: () => (markerClusterer) => {
      //   const clickedMarkers = markerClusterer.getMarkers();
      //
      //   console.log(markerClusterer);
      // },
      // onMarkerDownClick: (props) => (marker) => {
      //   console.log(props);
      //   const newCenter = {
      //     lat: marker.latLng.lat(),
      //     lng: marker.latLng.lng(),
      //   };

      //   refs.map.panTo(newCenter);
      // },
    })),
    withScriptjs,
    withGoogleMap,
  )((props) =>
    <GoogleMap
      // ref='map'
      defaultZoom={8}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
      center={props.userGeoParams.mapCenter}
      ref={props.onMapMounted}
      onDragEnd={async () => {
        console.clear();
        console.log(props);

        const getCoords = () => ({ lat: refs.map.getCenter().lat(), lng: refs.map.getCenter().lng() });
        const getRectangle = () => refs.map.getBounds();
        const bounds = refs.map.getBounds();

        // https://developers.google.com/maps/documentation/javascript/reference/map#Map.getBounds
        await specialLog(
          '1) BOUNDS\nrefs.map.getBounds()',
          null,
          [getRectangle(), 'https://developers.google.com/maps/documentation/javascript/reference/map#Map.getBounds']
        );

        // debounce () should be used...
        // await props.onChangeMapCenter(getCoords())
        await (() => {
          console.log('onDragEnd ()');
          return Promise.resolve();
        })()
          .then(async () => {
            const mapCenter = getCoords();

            await specialLog('2) CENTER\nrefs.map.getCenter().lat()\nrefs.map.getCenter().lng()', null, [mapCenter.lat, mapCenter.lng]);
          })
          .then(async () => {
            const ne = bounds.getNorthEast();
            const sw = bounds.getSouthWest();

            await specialLog('3.1)\nbounds= refs.map.getBounds()', null, [bounds]);
            await specialLog('3.2)\nne= bounds.getNorthEast()\nne.lat()\nne.lng()', null, [ne, ne.lat(), ne.lng()]);
            await specialLog('3.3)\nsw= bounds.getSouthWest()\nsw.lat()\nsw.lng()', null, [sw, sw.lat(), sw.lng()]);
          });
        }}
    >
      {
        props.isMarkerShown && (
          <Marker
            position={{
              lat: (props.userGeoParams.enabledAndDetected ? props.userGeoParams.lat : -34.397),
              lng: (props.userGeoParams.enabledAndDetected ? props.userGeoParams.lng : 150.397),
            }}
            onClick={props.onMarkerClick}
          />
        )
      }
      {
        !props.userGeoParams.blockedByUser && !props.userGeoParams.enabledAndDetected
        ? (
          <Geo
            onSuccess={async (arg) => {
              const { latitude: lat, longitude: lng } = arg.coords;

              console.log(arg);
              await props.dispatch(updateUserGeoParams({ lat, lng, blockedByUser: false, enabledAndDetected: true, mapCenter: { lat, lng }, reason: 'Ok' }));
            }}
            onError={async (a = { code: 0 }) => {
              console.warn(a);
              /*
                code:
                  1, message: 'User denied geolocation prompt'
              */
              switch (a.code) {
                case 1: await props.dispatch(updateUserGeoParams({ lat: null, lng: null, blockedByUser: true, enabledAndDetected: false, mapCenter: props.userGeoParams.mapCenter, reason: `code: ${a.code}, message: ${a.message}` })); break;
                default: await props.dispatch(updateUserGeoParams({ lat: null, lng: null, blockedByUser: false, enabledAndDetected: false, mapCenter: props.userGeoParams.mapCenter, reason: `code: ${a.code}, message: ${a.message}` })); break;
              }
              // this.props.updateGeo({ lat: null, lng: null, success: false });
            }}
          />
        ) : null
      }
    </GoogleMap>
  ))
);

class MyFancyComponent extends React.PureComponent {
  state = {
    isMarkerShown: true,
  }

  async componentDidMount() {
    // await this.delayedShowMarker()
  }

  // delayedShowMarker = () => {
  //   setTimeout(() => {
  //     this.setState({ isMarkerShown: true })
  //   }, 3000);
  //   return Promise.resolve();
  // }

  handleMarkerClick = () => {
    this.setState(
      { isMarkerShown: false },
      // () => {
      //   this.delayedShowMarker();
      //     .then(() => {
      //       console.log(this.props.userGeoParams);
      //     });
      // }
    );
  }

  render() {
    return (
      <MyMapComponent
        {...this.props}
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    )
  }
};

export const Example2 = withGoogleMapApiKey(MyFancyComponent);
