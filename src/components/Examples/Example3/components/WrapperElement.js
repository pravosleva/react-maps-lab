import React from 'react';
import styled, { css } from 'styled-components';


export const WrapperElement = styled('div')`
    /* margin: auto; */
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  border: none;
  border-top: 1px dashed lightgray;
  border-bottom: 1px dashed lightgray;

  ${(p) => !p.carousel && css`display: flex; justify-content: center; align-items: center;`}
  ${(p) => p.carousel && css`
    padding: 10px 50px 10px 50px;
  `}
`;
