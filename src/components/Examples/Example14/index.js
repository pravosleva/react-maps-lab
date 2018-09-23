import React from 'react';
import ReactMapboxGl, {
  Cluster,
  Marker,
  // Popup,
} from 'react-mapbox-gl';
// import { ReactMapboxGlCluster } from 'react-mapbox-gl-cluster';

import styled from 'styled-components';
import { connect } from 'react-redux';
// import { specialLog } from '../specialLog'; // USAGE: specialLog('look', null, ['tst']);
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

const mapProps = {
  center: [-95.7129, 37.0902],
  zoom: [0],
  // style: 'mapbox://styles/mapbox/streets-v8',
};

const mapState = ({ markers }) => ({
  items: markers.items,
});


const styles = {
  clusterMarker: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundColor: '#51D5A0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    border: '2px solid #56C498',
    cursor: 'pointer'
  },
  marker: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundColor: '#E0E0E0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid #C9C9C9'
  }
};

// const StyledPopup = styled('div')`
//   background: white;
//   color: #3f618c;
//   font-weight: 400;
//   padding: 5px;
//   border-radius: 2px;
// `;

export const Example14 = withMapboxApiKey(connect(mapState)((props) => {
  const Map = ReactMapboxGl({ accessToken: props.apiKey });

  return (
    <WrapperContainer>
      <WrapperElement key={String(`${props.items[0].lat}${props.items[0].lng}`)}>
        <Map
          {...mapProps}
          style='mapbox://styles/mapbox/streets-v9' // eslint-disable-line react/style-prop-object
          containerStyle={{
            height: '100vh',
            width: '100vw',
          }}
        >
          <Cluster
            ClusterMarkerFactory={(coordinates) => (
              <Marker
                key={Math.random()}
                coordinates={coordinates}
                style={styles.clusterMarker}
              >
                C
              </Marker>
            )}
            // radius={60}
          >
            {
              props.items.map((e) => ({
                "type": "Feature",
                "properties": {},
                "geometry": {
                  "type": "Point",
                  "coordinates": [e.lng, e.lat]
                }
              })).map((feature, key) =>
                <Marker
                  key={Math.random()}
                  style={styles.marker}
                  coordinates={feature.geometry.coordinates}
                  // onClick={() => console.log(feature.geometry.coordinates)}

                  // See more:
                  // https://github.com/alex3165/react-mapbox-gl/blob/762a7971f08a6c6cfc577bf49517cde5fd770fb2/example/src/demos/htmlCluster.tsx
                >
                  M
                </Marker>
              )
            }
          </Cluster>
          {/*
            true && (
              <Popup offset={[0, -50]} coordinates={popup.coordinates}>
                <StyledPopup>
                  {popup.leaves.map(
                    (leaf, index) => (
                      <div key={index}>
                        {leaf.props['data-feature'].properties.name}
                      </div>
                    )
                  )}
                  {popup.total > popup.leaves.length ? (
                    <div>And more...</div>
                  ) : null}
                </StyledPopup>
              </Popup>
            )
          */}
        </Map>
      </WrapperElement>
    </WrapperContainer>
  )
}));
