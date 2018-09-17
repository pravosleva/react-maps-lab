import React from 'react';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
// import Overlay from 'pigeon-overlay';
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
`;

const mapState = ({ markers }) => ({
  items: markers.items,
});

export const Example12 = connect(mapState)(({ items }) => (
  <WrapperContainer>
    <WrapperElement>
      <Map
        center={[-34.8043978515038, 152.37730272101211]}
        zoom={5}
        // width={600}
        // height={500}
      >
        {
          items.map((e, i, a) => (
            <Marker key={Math.random()} anchor={[e.lat, e.lng]} payload={i} onClick={({ event, anchor, payload }) => specialLog('event, anchor, payload', null, [event, anchor, payload])} />
          ))
        }
        {/*
        <Overlay anchor={[50.879, 4.6997]} offset={[120, 79]}>
          <img src='pigeon.jpg' width={240} height={158} alt='' />
        </Overlay>
        */}
      </Map>
    </WrapperElement>
  </WrapperContainer>
));
