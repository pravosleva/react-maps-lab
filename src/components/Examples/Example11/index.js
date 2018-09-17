import React from 'react';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import Overlay from 'pigeon-overlay';
import styled from 'styled-components';
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

export const Example11 = () => (
  <WrapperContainer>
    <WrapperElement>
      <Map
        center={[50.879, 4.6997]}
        zoom={12}
        // width={600}
        // height={500}
      >
        <Marker anchor={[50.874, 4.6947]} payload={1} onClick={({ event, anchor, payload }) => specialLog('event, anchor, payload', null, [event, anchor, payload])} />

        <Overlay anchor={[50.879, 4.6997]} offset={[120, 79]}>
          <img src='pigeon.jpg' width={240} height={158} alt='' />
        </Overlay>
      </Map>
    </WrapperElement>
  </WrapperContainer>
);
