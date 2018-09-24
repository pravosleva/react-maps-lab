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
  box-shadow: 0 6px 10px 0 #666;

  font-size: 40px;
  color: white;
  text-align: center;
  line-height: 56px;
  width: 56px;
  height: 56px;

  &:hover {
    box-shadow: 0 6px 14px 0 #666;
    transform: scale(1.05);
  }

  @media(min-width:768px){
    display: none;
  }
  outline: none;
`;
