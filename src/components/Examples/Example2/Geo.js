import React from 'react';
import { geolocated } from 'react-geolocated';


class Geo extends React.Component {
  render() {
    // console.log(this.props);

    return !this.props.isGeolocationAvailable
      ? <div />
      : !this.props.isGeolocationEnabled
        ? <div />
        : this.props.coords
          ? (
            <div />
        ) : <div />;
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Geo);
