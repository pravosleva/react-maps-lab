import React from 'react';
// import {
//   compose,
//   withHandlers,
//   withStateHandlers,
//   lifecycle,
// } from 'recompose';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
// import { ReactMapboxGlCluster } from 'react-mapbox-gl-cluster';
// import { data } from './data';

import styled from 'styled-components';
import { connect } from 'react-redux';
// import { specialLog } from '../specialLog'; // specialLog('look', null, ['tst']);
import withMapboxApiKey from '../withMapboxApiKey';


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
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

// accessToken: process.env.MAPBOX_GL_TOKEN,
const mapProps = {
  center: [-95.7129, 37.0902],
  zoom: [3],
  style: 'mapbox://styles/mapbox/streets-v8',
};

const mapState = ({ markers }) => ({
  items: markers.items,
});

export const Example12 = withMapboxApiKey(connect(mapState)((props) => {
  const Map = ReactMapboxGl({
    accessToken: props.apiKey,
  });
  return (
    <WrapperContainer>
      <WrapperElement>
        <Map
          {...mapProps}
          accessToken={props.apiKey}
          style='mapbox://styles/mapbox/streets-v9' // eslint-disable-line react/style-prop-object
          containerStyle={{
            height: '100vh',
            width: '100vw',
          }}
        >
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15" }}
          >
            <Feature coordinates={[-0.481747846041145, 51.3233379650232]}/>
          </Layer>
        </Map>
      </WrapperElement>
    </WrapperContainer>
  )
}));
