import React from 'react';
import GoogleMapReact from 'google-map-react';
// import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose, withHandlers, withStateHandlers } from 'recompose';
// import { InfoWindow } from './InfoWindow';
import supercluster from 'points-cluster';
import { specialLog } from '../specialLog'; // specialLog('look', null, ['tst']);
import { updateMapState } from '../../../actions';

import Marker from '../Example8/components/Marker';
import ClusterMarker from '../Example8/components/ClusterMarker';

import withGoogleMapApiKey from '../withGoogleMapApiKey';


const mapState = ({ markers, dispatch }) => ({
  items: markers.items.map((e) => ({
    ...e,
    markerKey: `MARKER_${Math.random()}`,
    description: 'bla bla bla'.repeat(1),
  })),
  // activeMarkerKey: markers.activeMarkerKey,
  specialKey: markers.specialKey,
  center: markers.mapState.center,
  zoom: markers.mapState.zoom,
  bounds: markers.mapState.bounds,
  // dispatch,
});

const SimpleMap = compose(
  withHandlers(() => ({

    onMapLoaded: (props) => (arg) => { // { map, maps }
      specialLog('HOC | onMapLoaded () called', null, []);
      // console.log(arg);
      props.createClusters();
    },
    // onMarkerClustererClick: (props) => (arg) => {
    //   specialLog('HOC | onMarkerClustererClick: () => (arg) => {}\narg.getMarkers ()', null, [arg.getMarkers()]);
    //   props.handleClustererClick(arg);
    // },
    onChange: (props) => (arg) => { // bounds, marginbounds
      const { center, zoom, bounds } = arg;

      // console.clear();

      (() => {
        props.dispatch(updateMapState({ center, zoom, bounds }));
        return Promise.resolve();
      })()
        // .then(() => specialLog('HOC | onChange: (props) => () => {}\nnew: center, zoom, bounds', null, [center, `zoom= ${zoom}`, bounds]))
        .then(() => {
          props.createClusters();
        })
        .then(() => {
          specialLog('props', null, [props]);
        });
    },
  })),
)((props) =>
  <div style={{ height: '100vh', width: '100%' }}>
    <GoogleMapReact
      onChange={props.onChange}
      bootstrapURLKeys={{ key: props.apiKey }}
      center={props.center}
      zoom={props.zoom}
      onGoogleApiLoaded={props.onMapLoaded}
      // minZoom={6}
      // maxZoom={25}
    >
      {/*
        props.items.map((m) => (
          <InfoWindow
            lat={m.lat}
            lng={m.lng}
            text={m.description}
            markerKey={m.markerKey}
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
          />
        ))
      */}
      {
        props.clusters.map(item => {
          if (item.numPoints === 1) {
            return (
              <Marker
                // key={item.id}
                // key={`${props.specialKey}_${item.id}`}
                key={`${props.specialKey}_${Math.random()}`}
                lat={item.points[0].lat}
                lng={item.points[0].lng}
              />
            );
          }

          return (
            <ClusterMarker
              // key={item.id}
              key={`${props.specialKey}_${Math.random()}`}
              lat={item.lat}
              lng={item.lng}
              points={item.points}
            />
          );
        })
      }
    </GoogleMapReact>
  </div>
);

const IncreaseFunctional = withStateHandlers(
  { clusters: [] },
  {
    createClusters: ({}, props) => () => { // eslint-disable-line no-empty-pattern
      specialLog('IncreaseFunctional of HOC\ncreateClusters: ({ items, center }, props) => () => {}\nprops', null, [props]);

      // FOR EXAMPLE:
      // props.dispatch(addCounter());
      // return { clusters: [] }

      const { items, center, bounds, zoom } = props;
      const getClusters = ({ points, center, zoom }) => {
        const clusters = supercluster(points, { minZoom: 6, maxZoom: 18, radius: 30, extent: 35 });

        return clusters({ center, zoom, points: items, bounds });
      };

      // console.log(
      //   supercluster(props.items, { minZoom: 0, maxZoom: 16, radius: 60 })({ center: props.center, zoom: props.zoom, points: props.items, bounds: props.bounds })
      // );

      return {
        clusters: bounds
          ? getClusters({ points: items, center, zoom }).map(({ wx, wy, numPoints, points }) => ({
              lat: wx,
              lng: wy,
              id: `CLUSTER_${Math.random()}`,
              points,
              numPoints,
            }))
          : [],
      };
    },
  }
);

export const Example7 = withGoogleMapApiKey(connect(mapState)(IncreaseFunctional(SimpleMap)));
