import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

import { specialLog } from './specialLog';
import { updateExample9ApiKey } from '../../actions';


const mapState = ({ example9, dispatch }) => ({
  apiKey: example9.apiKey,
  dispatch,
});

const withApiKey = (ComposedComponent) => {
  class AppLayout extends Component {
    render() {
      if (!this.props.apiKey) {
        Swal({
          title: 'Google Map API_KEY',
          text: 'Could be changed in Example9',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Ok',
          // showLoaderOnConfirm: true,
          // preConfirm: (login) => {
          //   return fetch(`//api.github.com/users/${login}`)
          //     .then(response => {
          //       if (!response.ok) {
          //         throw new Error(response.statusText)
          //       }
          //       return response.json()
          //     })
          //     .catch(error => {
          //       swal.showValidationError(
          //         `Request failed: ${error}`
          //       )
          //     })
          // },
          // allowOutsideClick: () => !swal.isLoading()
          footer: '<a href="https://developers.google.com/maps/documentation/javascript/get-api-key" target="_blank">How you can receive it</a>',
        }).then((result) => {
          if (result.value) {
            // Swal({
            //   title: result.value,
            //   text: 'tst',
            //   type: 'info',
            // })
            this.props.dispatch(updateExample9ApiKey(result.value));
          }
        })
        .catch((err) => Swal({
          position: 'top-end',
          title: 'FckUp!',
          text: 'Sorry...',
          // html: Array.isArray(err) ? `<ul style='list-style-type: none; padding: 0;'>${err.map((e) => `<li>${e}</li>`)}</ul>` : `<div>${err}</div>`,
          // type: 'error',
          showConfirmButton: false,
          timer: 3000,
        }));
      }
      specialLog('G\nCould be helpful', null, [atob('QUl6YVN5RHZXT2RtdERHT3liWHBGN1hFZGl4b0lJbUxjQ0RUemRR'), atob('QUl6YVN5Q1lmYUptODRWOUR1YWdod1RaTGFQX0tQY1VKeGdyRF9f')]);

      return (
        <Fragment>
          {
            !this.props.apiKey
            ? (
              <div className="container">
                <h1>Wsp!</h1>
                <p>API_KEY should be entered...</p>
              </div>
            )
            : <ComposedComponent {...this.props} />
          }
        </Fragment>
      );
    }
  }

  return connect(mapState)(AppLayout);
};

export default withApiKey;
