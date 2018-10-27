import React from 'react';
import styled, { css } from 'styled-components';


export const WrapperElement = styled('div')`
    /* margin: auto; */
  box-sizing: border-box;
  padding: 50px;
  width: 100%;
  border: none;
    /*
    border-top: 1px dashed lightgray;
    border-bottom: 1px dashed lightgray;
    */

  ${(p) => !p.carousel && css`display: flex; justify-content: center; align-items: center;`}
  ${(p) => p.carousel && css`
    padding: 50px 50px 50px 50px;
  `}

  position: relative; /* For titles only */
`;

export const Title = styled('h2')`
  position: absolute;
  top: -15px; left: 25px;
  color: gray; opacity: 0.2;
`;
