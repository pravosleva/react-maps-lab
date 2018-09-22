import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import { ReactMapboxGlCluster } from 'react-mapbox-gl-cluster';

import styled from 'styled-components';
import { connect } from 'react-redux';
import { specialLog } from '../specialLog'; // specialLog('look', null, ['tst']);


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

// const dataSample = {
//   "type": "FeatureCollection",
//   "features": [
//     {
//       "type": "Feature",
//       "properties": {},
//       "geometry": {
//         "type": "Point",
//         "coordinates": [
//           -120.05859375,
//           45.644768217751924
//         ]
//       }
//     }
//   ]
// };

const Map = ReactMapboxGl({
  // accessToken: process.env.MAPBOX_GL_TOKEN,
  accessToken: 'pk.eyJ1IjoicHJhdm9zbGV2YSIsImEiOiJjam1kdmJ4azgxZnEzM3FwdGdiZzllOGJ1In0.D-3eFTb0FwfwD66kwlx7Bg',
});
const mapProps = {
  center: [-95.7129, 37.0902],
  zoom: [0],
  style: 'mapbox://styles/mapbox/streets-v8',
};

const mapState = ({ markers }) => ({
  items: markers.items,
});

export const Example13 = connect(mapState)((props) => (
    <WrapperContainer>
      <WrapperElement key={String(`${props.items[0].lat}${props.items[0].lng}`)}>
        <Map
          {...mapProps}
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}
        >
          <ReactMapboxGlCluster
            data={{
              "type": "FeatureCollection",
              "features": props.items.map((e) => ({
                "type": "Feature",
                "properties": {},
                "geometry": {
                  "type": "Point",
                  "coordinates": [e.lng, e.lat]
                }
              }))
            }}
            onClick={(properties, coords, offset) => {
              console.clear();
              specialLog('Receive event onClick at properties', null, [properties, coords, offset]);
            }
            onMouseEnter={(properties, coords, offset) => {
              console.clear();
              specialLog('Receive event onMouseEnter at properties', null, [properties, coords, offset]);
            }
            onMouseLeave={(properties, coords, offset) => {
              console.clear();
              specialLog('Receive event onMouseLeave at properties', null, [properties, coords, offset]);
            }
            onClusterClick={(properties, coords, offset) => {
              console.clear();
              specialLog('Receive event onClusterClick at properties', null, [properties, coords, offset]);
            }
            onClusterMouseEnter={(properties, coords, offset) => {
              console.clear();
              specialLog('Receive event onClusterMouseEnter at properties', null, [properties, coords, offset]);
            }
            onClusterMouseLeave={(properties, coords, offset) => {
              console.clear();
              specialLog('Receive event onClusterMouseLeave at properties', null, [properties, coords, offset]);
            }
          />
        </Map>
      </WrapperElement>
    </WrapperContainer>
  )
);
