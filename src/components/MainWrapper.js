// import React from 'react';
import styled, { css } from 'styled-components';


export const MainFlexWrapper = styled('div')`
  font-family: Montserrat;
  display: flex;
  align-items: stretch;
  align-content: center;

  width: 100%;
  height: calc(100vh);
`;

export const MainFlexElement = styled('div')`
  &:first-child {
    padding: 20px;
    width: 350px;
    max-width: 350px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, .2);
  }
  &:nth-child(2n) {
    width: calc(100% - 250px);
  }
  ${(props) => props.bordered && css`border: 1px dashed red;`}
`;
