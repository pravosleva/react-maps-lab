import React from 'react';
// import {
//   compose, withProps, withHandlers,
//   withStateHandlers,
// } from 'recompose';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';

import {
  // updateExample9response,
  updateExample9ApiKey,
} from '../../../actions';
// import withGoogleMapApiKey from '../withGoogleMapApiKey';


// https://developers.google.com/maps/documentation/geolocation/intro

const WrapperContainer = styled('div')`
  height: calc(100vh);
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;
  padding: 10px;
`;

const WrapperElement = styled('div')`
  margin: auto;
  max-width: 550px;
  width: 100%;

  display: flex;
`;

const Button = styled('button')`
  padding: 10px;
  border-radius: 0 4px 4px 0;
  border: 1px solid #226078;
  border-left: none;
  color: white;
  background-color: #3AA6D0;
  &:hover, &:active, &:focus {
    background-color: #0776A0;
  }
  font-family: inherit;
  margin-right: auto;
  width: 200px;
`;

const Input = styled('input')`
  padding: 10px;
  border-radius: 4px 0 0 4px;
  border: 1px solid #226078;
  box-sizing: border-box;
  font-family: inherit;
    /* flex: 2 0 100px; */
  width: 100%;
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
        <Input
          placeholder='YOUR_API_KEY'
          value={props.apiKey}
          onChange={(e) => {
            props.dispatch(updateExample9ApiKey(e.target.value));
          }}
        />
        <Button onClick={() => {
          // await props.onClick();

          fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${props.apiKey}`, opts)
            .then((res) => {
              if (res.ok) {
                // console.log('SUCCESS');
                return res.json();
              }
              throw new Error(['res.ok is not ok, see console...']); // eslint-disable-line no-throw-literal
            })
            .then((res) => Swal({
              position: 'top-end',
              title: 'Ok',
              // text: JSON.stringify(res),
              text: 'Successfully!',
              // type: 'info',
              showConfirmButton: false,
              timer: 3000,
            }))
            .catch((err) => Swal({
              position: 'top-end',
              title: 'Sorry',
              html: Array.isArray(err) ? `<ul style='list-style-type: none; padding: 0;'>${err.map((e) => `<li>${e}</li>`)}</ul>` : `<div>${err}</div>`,
              // type: 'error',
              showConfirmButton: false,
              timer: 3000,
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
const mapState = ({ example9 }) => ({
  apiKey: example9.apiKey,
});

// export const Example9 = withGoogleMapApiKey(connect(mapState)(tstButton));
export const Example9 = connect(mapState)(tstButton);
