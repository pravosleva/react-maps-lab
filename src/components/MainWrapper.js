// import React from 'react';
import styled, { css } from 'styled-components';


export const MainFlexWrapper = styled('div')`
  font-family: Montserrat;
  display: flex;
  align-items: stretch;
  align-content: center;

  width: 100%;
  height: calc(100vh);
  overflow: hidden;
`;

export const MainFlexElement = styled('div')`
  @media(min-width:768px){
    &:first-child {
      min-width: 350px;
      max-width: 350px;
      box-shadow: 0px 0px 5px rgba(0, 0, 0, .5);
      border-right: 1px solid lightgray;
      z-index: 1000;
    }
    &:nth-child(2n) {
      width: calc(100% - 350px);
    }
  }
  @media(max-width:767px){
    &:first-child {
      position: fixed; top: 0; bottom: 0;
      z-index: 2;
      width: 100%;
      background-color: #fff;
        /* opacity: 0.8; */
      /* min-height: 100vh; */
      height: 100vh;
      ${(p) => p.opened && css`
        transform: translateX(-100%);
      `}
    }
    &:nth-child(2n) {
      z-index: 1;
      width: 100%;
    }
  }
  transition: transform 0.35s linear;
  ${(props) => props.bordered && css`border: 1px dashed red;`}
`;
