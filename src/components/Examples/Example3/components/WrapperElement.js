import React from 'react';
import styled, { css } from 'styled-components';


export const WrapperElement = styled('div')`
    /* margin: auto; */
  box-sizing: border-box;
  @media(min-width: 768px){ padding: 50px; }
  @media(max-width: 767px){ padding: 30px; }
  width: 100%;
  border: none;
    /*
    border-top: 1px dashed lightgray;
    border-bottom: 1px dashed lightgray;
    */

  ${(p) => !p.carousel && css`display: flex; justify-content: center; align-items: center;`}

  position: relative; /* For titles only */
`;

export const Title = styled('h2')`
  position: absolute;
  @media(min-width: 768px){ top: -15px; left: 25px; }
  @media(max-width: 767px){ top: -30px; left: 5px; }
  color: white;
  user-select: none;
`;
