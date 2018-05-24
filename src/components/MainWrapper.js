import React from 'react';
import styled from 'styled-components';


export const MainFlexWrapper = styled('div')`
  font-family: Montserrat;
  display: flex;
  flex-flow: row nowrap;
    /*align-items: center;*/
  justify-content: flex-start;
  align-items: stretch;
  align-content: center;

  width: 100%;
`;

export const MainFlexElement = styled('div')`
  &:first-child {
    padding: 20px;
    width: 250px;
    max-width: 250px;
  }
  &:nth-child(2n) {
    width: calc(100% - 250px);
  }
`;
