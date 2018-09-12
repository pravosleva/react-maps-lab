import React from 'react';
import {
  // compose, withProps, withHandlers,
  withStateHandlers,
} from 'recompose'; // , withState,
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';

import { updateExample9response } from '../../../actions';


// https://developers.google.com/maps/documentation/geolocation/intro

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

const myHeaders = new Headers();
myHeaders.set("Content-Type", "application/json");
const opts = {
  method: 'POST',
  headers: myHeaders,
  // mode: 'cors',
  // cache: 'default',
  body: JSON.stringify({ considerIp : "true" }),
};

const tstButton = (props) => {
  return (
    <WrapperContainer>
      <WrapperElement>
        <Button onClick={() => {
          // await props.onClick();

          fetch('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBp6XFxelisRln2CPnW81XHpHI5rr1GExE', opts)
            .then((res) => {
              if (res.ok) {
                console.log('SUCCESS');
                return res.json();
              }
              throw new Error(['res.ok is not ok']); // eslint-disable-line no-throw-literal
            })
            .then((json) => {
              console.log(json);
            })
            .then((res) => Swal({
              title: 'Ok',
              test: JSON.stringify(res),
              type: 'info',
            }))
            .catch((err) => Swal({
              title: 'Sorry',
              html: Array.isArray(err) ? `<ul style='list-style-type: none; padding: 0;'>${err.map((e) => `<li>${e}</li>`)}</ul>` : `<div>${err}</div>`,
              type: 'error',
            }));

          // props.dispatch(updateExample9response());
        }}>
          Try to get data by POST
        </Button>
      </WrapperElement>
    </WrapperContainer>
  )
};

tstButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
const mapState = ({ counter }) => ({
  globalCount: counter
});

// withStateHandlers
// const IncreaseFunctional = withStateHandlers(
//   { localCount: 0 },
//   {
//     onClick: ({ localCount }, props) => () => {
//       props.dispatch(addCounter());
//       return { localCount: localCount + 1 }
//     },
//   }
// );

// export const Example9 = connect(mapState)(IncreaseFunctional(tstButton));
export const Example9 = connect(mapState)(tstButton);
