import React from 'react';
import { compose, withStateHandlers } from 'recompose';
import styled, { css } from 'styled-components';


const Wrapper = styled('div')`
  width: 100%;
  height: 100%;

  display: flex;
`;
const Sidebar = styled('div')`
  background-color: white;

  @media(min-width: 768px){
    min-width: 310px;
    width: 310px;
  }
  @media(max-width: 767px){
    height: 100%;
    min-width: 100%;
    position: absolute;
    z-index: 3;
    ${(p) => !p.opened && css`transform: translateX(-100%);`}
    transition: transform 0.3s ease-in-out;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.8;
`;

const withLayout = (ComposedComponent) => compose(
  withStateHandlers(
    {
      sidebarOpened: true,
    },
    {
      sidebarToggler: ({ sidebarOpened }, props) => () => {
        // props.dispatch(addCounter());
        return { sidebarOpened: !sidebarOpened }
      },
    }
  ),
)((props) => (
  <Wrapper>
    <Sidebar opened={props.sidebarOpened}>
      <p style={{ textAlign: 'center' }}>
        <strong>Input fields should be set here</strong>
        <br />
        sidebarOpened= {String(props.sidebarOpened)}
        <br />
        <em style={{ opacity: '0.5' }}>Relevant for max-width 767px</em>
      </p>
    </Sidebar>
    <ComposedComponent {...props} />
  </Wrapper>
));

export default withLayout;
