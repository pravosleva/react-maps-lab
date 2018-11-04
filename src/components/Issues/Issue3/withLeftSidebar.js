import React from 'react';
import { compose, withStateHandlers } from 'recompose';
import styled, { css } from 'styled-components';


const Wrapper = styled('div')`
  width: 100%;
  height: 100%;
  @media(max-width: 767px){
    top: 0; bottom: 0; /* tst */
    position: relative;
  }

  display: flex;
  box-sizing: border-box;
`;
const Sidebar = styled('div')`
  background-color: white;

  @media(min-width: 768px){
    min-width: 310px;
    width: 310px;
    /* Should be opened always */
  }
  @media(max-width: 767px){
    min-height: 100%; height: 100%;
    min-width: 100%; width: 100%;
    position: absolute;
    transition: transform 0.5s ease-in-out;
    opacity: 0.8;
    translateX(0);
    ${(p) => !p.opened && css`transform: translateX(-100%);`}
  }

  /*
    display: flex;
    justify-content: center;
    align-items: center;
  */
  overflow-y: auto;
  box-sizing: border-box;

  z-index: 3;
`;

const withLayout = (ComposedComponent) => compose(
  withStateHandlers(
    {
      sidebarOpened: true,
    },
    {
      sidebarToggler: ({ sidebarOpened }, props) => (val) => {
        // props.dispatch(addCounter());
        return { sidebarOpened: val ? val : !sidebarOpened }
      },
    }
  ),
)((props) => (
  <Wrapper>
    <Sidebar opened={props.sidebarOpened}>
      <div style={{ padding: '0 10px 0 10px' }}>
        <p style={{ textAlign: 'center' }}>
          <strong>Input fields should be set here</strong>
          <br />
          sidebarOpened= {String(props.sidebarOpened)}
          <br />
          <em style={{ opacity: '0.5' }}>Relevant for max-width 767px</em>
        </p>
        <p>{`${'bla '.repeat(100)}bla.`}</p>
        <p>{`${'bla '.repeat(100)}bla.`}</p>
        <p>{`${'bla '.repeat(100)}bla.`}</p>
        <p>{`${'bla '.repeat(100)}bla.`}</p>
        <p>{`${'bla '.repeat(100)}bla.`}</p>
        <p>{`${'bla '.repeat(100)}bla.`}</p>
        <p>{`${'bla '.repeat(100)}bla.`}</p>
        <p>{`${'bla '.repeat(100)}bla.`}</p>
      </div>
    </Sidebar>
    <ComposedComponent {...props} />
  </Wrapper>
));

export default withLayout;
