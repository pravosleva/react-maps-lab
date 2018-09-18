import React from 'react';

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

const mapState = ({ markers }) => ({
  items: markers.items,
});

export const Example12 = connect(mapState)(({ items }) => (
  <WrapperContainer>
    <WrapperElement>
      <code>In process...</code>
    </WrapperElement>
  </WrapperContainer>
));
