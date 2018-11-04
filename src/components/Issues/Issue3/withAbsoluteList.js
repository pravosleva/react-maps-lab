import React from 'react';
import PropTypes from 'prop-types';
import { compose, withStateHandlers } from 'recompose';
import styled, { css } from 'styled-components';


const Wrapper = styled('div')`
  width: 100%;
  height: 100%;
  @media(max-width: 767px){
    top: 0; bottom: 0; /* tst */
  }

  position: relative;
  box-sizing: border-box;
`;
const List = styled('div')`
  background-color: white;
  box-sizing: border-box;
  border-left: 1px solid lightgray;

  position: absolute;
  top: 0; left: 0;
  z-index: 2;
  height: 100%;
  ${(p) => p.test && css`border: 1px dashed red;`}

  @media(min-width: 768px){
    min-width: 310px;
    width: 310px;
    transform: translateX(100%);
    ${(p) => !p.opened && css`transform: translateX(0); background-color: white;`}
    transition: transform 0.3s ease-in-out, background-color 0.3s linear;
  }
  @media(max-width: 767px){
    min-width: 100%;
    width: 100%;
    opacity: 0.8;
    transform: translateX(0);
    ${(p) => !p.opened && css`transform: translateX(-100%); background-color: white;`}
    transition: transform 0.5s ease-in-out, background-color 0.5s linear;
  }
    /*
    display: flex;
    justify-content: center;
    align-items: center;
    */
`;
const InternalListWrapper = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;

  background-color: transparent;
    /*
    display: flex;
    justify-content: center;
    align-items: center;
    */
  box-sizing: border-box;
`;
const ListDesktopToggler = styled('button')`
  position: absolute;
  top: 0; right: -30px;
  width: 30px; height: 100%;
  padding: 0;
  cursor: pointer;
  border: none;
  background-color: rgba(255, 255, 255, 0.8);
  font-size: 30px;
  opacity: 0.7 !important;

  @media(max-width: 767px){ display: none; }
`;
const Content = styled('div')`
  opacity: 1;
  ${(p) => p.test && css`border: 1px dashed red;`}

  box-sizing: border-box;
  min-height: 100%; height: 100%;
  overflow-y: auto;
`;

const withLayout = (ComposedComponent) => compose(
  withStateHandlers(
    {
      listOpened: false,
    },
    {
      listToggler: ({ listOpened }, props) => (val) => ({ listOpened: val ? val : !listOpened }),
    }
  ),
)((props) => (
  <Wrapper>
    <List opened={props.listOpened}>
      <InternalListWrapper opened={props.listOpened}>
        <Content>
          <div style={{ padding: '0 10px 0 10px' }}>
            <p style={{ textAlign: 'center' }}>
              <strong>Items list should be set here</strong>
              <br />
              listOpened= {String(props.listOpened)}
              <br />
              <em style={{ opacity: '0.5' }}>Relevant for all devices</em>
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
        </Content>
        <ListDesktopToggler onClick={() => props.listToggler()}>
          {
            props.listOpened
            ? <i className='fa fa-angle-double-left' />
            : <i className='fa fa-angle-double-right' />
          }
        </ListDesktopToggler>
      </InternalListWrapper>
    </List>
    <ComposedComponent {...props} />
  </Wrapper>
));

withLayout.propTypes = {
  listOpened: PropTypes.bool.isRequired,
  listToggler: PropTypes.func.isRequired,
};
// withLayout.defaultProps = {
//   listOpened: () => {},
// };

export default withLayout;
