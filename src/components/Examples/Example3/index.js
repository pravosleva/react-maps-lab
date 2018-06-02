import React from 'react';
import { compose, withProps, withHandlers, withStateHandlers } from 'recompose'; // , withState,

import { connect } from 'react-redux';
import { addCounter } from '../../../actions';

import PropTypes from 'prop-types';

import styled from 'styled-components';
import NoSSR from 'react-no-ssr';


const WrapperContainer = styled('div')`
  height: calc(100vh);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap
  justify-content: center;
  align-items: center;
`;

const WrapperElement = styled('div')`
  margin: auto;
`;

const Button = styled('button')`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #226078;
  color: white;
  background-color: #3AA6D0;
  &:hover, &:active, &:focus {
    background-color: #0776A0;
  }
  font-family: inherit;
`;

const tstButton = (props) => {
  return (
    <NoSSR>
      <WrapperContainer>
        <WrapperElement>
          <Button onClick={async () => {
            await props.onClick();
            // await props.dispatch(addCounter());
          }}>
            {`Local counter: ${props.localCount} Global counter: ${props.globalCount}`}
          </Button>
        </WrapperElement>
      </WrapperContainer>
    </NoSSR>
  )
};

tstButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
const mapState = ({ counter }) => ({
  globalCount: counter
});

// withStateHandlers
const IncreaseFunctional = withStateHandlers(
  { localCount: 0 },
  {
    onClick: ({ localCount }, props) => () => {
      props.dispatch(addCounter());
      return { localCount: localCount + 1 }
    },
  }
);

export const Example3 = connect(mapState)(IncreaseFunctional(tstButton));
