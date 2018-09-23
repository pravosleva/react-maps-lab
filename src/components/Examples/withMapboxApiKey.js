import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

import { updateExample12 } from '../../actions';


const mapState = ({ example12, dispatch }) => ({
  example12,
  dispatch,
});

const withApiKey = (ComposedComponent) => {
  class AppLayout extends Component {
    render() {
      if (!this.props.example12.apiKey || !this.props.example12.confirmedByUser) {
        Swal({
          title: 'mapbox API_KEY',
          text: 'As you can see, default access token already entered',
          input: 'text',
          inputValue: this.props.example12.apiKey,
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
          footer: '<a href="https://www.mapbox.com/account/" target="_blank">https://www.mapbox.com/account/</a>',
        }).then((result) => {
          if (result.value) {
            // Swal({
            //   title: result.value,
            //   text: 'tst',
            //   type: 'info',
            // })
            this.props.dispatch(updateExample12({ ...this.props.example12, apiKey: result.value, confirmedByUser: true }));
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

      return (
        <Fragment>
          {
            !this.props.example12.apiKey || !this.props.example12.confirmedByUser
            ? (
              <div className="container">
                <h1>Wsp!</h1>
                <p>Access token should be entered...</p>
              </div>
            )
            : <ComposedComponent apiKey={this.props.example12.apiKey} />
          }
        </Fragment>
      );
    }
  }

  return connect(mapState)(AppLayout);
};

export default withApiKey;
