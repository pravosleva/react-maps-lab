import React from 'react';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  // withHandlers,
} from 'react-google-maps';
// import { geolocated } from 'react-geolocated';
import Geo from './Geo';
import { updateUserGeoParams } from '../../../actions';

const mapState = ({ userGeoParams, dispatch }) => ({
  userGeoParams,
  dispatch,
});

const MyMapComponent = connect(mapState)(compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDvWOdmtDGOybXpF7XEdixoIImLcCDTzdQ",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  // withHandlers(() => ({
  //   onMapMounted: () => (ref) => {
  //     refs.map = ref;
  //   }
  // })),
  withScriptjs,
  withGoogleMap,
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    center={props.userGeoParams.mapCenter}
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
));

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
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    )
  }
};

export const Example2 = MyFancyComponent;
