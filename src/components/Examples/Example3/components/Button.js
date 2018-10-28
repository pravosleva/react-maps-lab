import React from 'react';
import styled from 'styled-components';


export const Button = styled('button')`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #226078; box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
  @media(max-width: 767px){ width: 100%; }
  color: white;
  background-color: #3AA6D0;
  &:hover, &:active, &:focus { background-color: #0776A0; }
  font-family: inherit;
  cursor: pointer;
  outline: none;
`;
