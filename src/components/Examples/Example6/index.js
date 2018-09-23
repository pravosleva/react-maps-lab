import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
// import styled from 'styled-components';

import withGoogleMapApiKey from '../withGoogleMapApiKey';


const AnyReactComponent = ({ text, style, onClick, onCloseClick }) => (
  <div onClick={() => onClick(text)} style={style}>
    <code>{text}</code>
    <hr className='style-two' />
    <code>see console...</code>
    <div
      onClick={(e) => {
        e.stopPropagation();
        onCloseClick(`${text} closed`);
      }}
      style={{ position: 'absolute', top: '4px', right: '4px', padding: '2px 5px 2px 5px', border: '1px solid lightgray', borderRadius: '5px' }}
    >x</div>
  </div>
);

class SimpleMap extends Component {
  static defaultProps = {
    center: { lat: 59.95, lng: 30.33 },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: this.props.apiKey }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          // onGoogleApiLoaded={({map, maps}) => console.log(map, maps)}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text='Kreyser Avrora'
            style={{
              border: '1px solid transparent',
              borderRadius: '0 10px 10px 10px',
              boxShadow: '0 0 5px gray',
              height: '100px',
              width: '200px',
              padding: '10px',
              fontSize: '16px',
              backgroundColor: 'white',
              color: 'gray',
              cursor: 'pointer',
              position: 'relative',
            }}
            onClick={(ev) => {
              console.log(ev);
            }}
            onCloseClick={(ev) => {
              console.log(ev);
            }}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export const Example6 = withGoogleMapApiKey(SimpleMap);
