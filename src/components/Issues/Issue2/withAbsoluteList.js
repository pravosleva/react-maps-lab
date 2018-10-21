import React from 'react';
import PropTypes from 'prop-types';
import { compose, withStateHandlers } from 'recompose';
import styled, { css } from 'styled-components';


const Wrapper = styled('div')`
  width: 100%;
  height: 100%;

  position: relative;
`;
const List = styled('div')`
  background-color: white;

  position: absolute;
  top: 0; left: 0;
  z-index: 2;
  height: 100%;

  @media(min-width: 768px){
    min-width: 310px;
    width: 310px;
  }
  @media(max-width: 767px){
    min-width: 100%;
    width: 100%;
    opacity: 0.7;
  }

  ${(p) => !p.opened && css`transform: translateX(-100%);`}
  transition: transform 0.3s ease-in-out;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const InternalListWrapper = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;

  background-color: transparent;

  display: flex;
  justify-content: center;
  align-items: center;
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
  ${(p) => !p.opened && css`opacity 0;`}
`;

const withLayout = (ComposedComponent) => compose(
  withStateHandlers(
    {
      listOpened: true,
    },
    {
      listToggler: ({ listOpened }, props) => () => ({ listOpened: !listOpened }),
    }
  ),
)((props) => (
  <Wrapper>
    <List opened={props.listOpened}>
      <InternalListWrapper>
        <Content
          opened={props.listOpened} // For opacity control only
          style={{ textAlign: 'center' }}
        >
          listOpened= {String(props.listOpened)}
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
};
// withLayout.defaultProps = {
//   listOpened: () => {},
// };

export default withLayout;
