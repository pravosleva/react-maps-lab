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

const dataSample = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          -120.05859375,
          45.644768217751924
        ]
      }
    }
  ]
};

const Map = ReactMapboxGl({
  // accessToken: process.env.MAPBOX_GL_TOKEN,
  accessToken: 'pk.eyJ1IjoicHJhdm9zbGV2YSIsImEiOiJjam1kdmJ4azgxZnEzM3FwdGdiZzllOGJ1In0.D-3eFTb0FwfwD66kwlx7Bg',
});
const mapProps = {
  center: [-95.7129, 37.0902],
  zoom: [3],
  style: 'mapbox://styles/mapbox/streets-v8',
};

const mapState = ({ markers }) => ({
  items: markers.items,
});

export const Example13 = connect(mapState)((props) => (
    <WrapperContainer>
      <WrapperElement>
        <Map
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
            onClick={(properties, coords, offset) =>
              console.log(
                `Receive event onClick at properties: ${properties}, coords: ${coords}, offset: ${offset}`
              )
            }
            onMouseEnter={(properties, coords, offset) =>
              console.log(
                `Receive event onMouseEnter at properties: ${properties}, coords: ${coords}, offset: ${offset}`
              )
            }
            onMouseLeave={(properties, coords, offset) =>
              console.log(
                `Receive event onMouseLeave at properties: ${properties}, coords: ${coords}, offset: ${offset}`
              )
            }
            onClusterClick={(properties, coords, offset) =>
              console.log(
                `Receive event onClusterClick at properties: ${properties}, coords: ${coords}, offset: ${offset}`
              )
            }
            onClusterMouseEnter={(properties, coords, offset) =>
              console.log(
                `Receive event onClusterMouseEnter at properties: ${properties}, coords: ${coords}, offset: ${offset}`
              )
            }
            onClusterMouseLeave={(properties, coords, offset) =>
              console.log(
                `Receive event onClusterMouseLeave at properties: ${properties}, coords: ${coords}, offset: ${offset}`
              )
            }
          />
        </Map>
      </WrapperElement>
    </WrapperContainer>
  )
);
