// import React from 'react';
import styled from 'styled-components';


export const TogglerBtn = styled('button')`
  position: absolute;
  z-index: 3;
  right: 16px;
  bottom: 16px;
  background-color: #0399D0;
  color: #fff;
  border-radius: 50%;
  border: none;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  font-size: 30px;
  color: white;
  text-align: center;
  width: 56px;
  height: 56px;

  &:hover {
    transform: scale(1.01);
  }

  @media(min-width:768px){
    display: none;
  }
  outline: none;
`;
