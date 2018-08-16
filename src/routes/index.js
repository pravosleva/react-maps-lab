import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'; // , Redirect
import { Home } from '../components/Home';
import NotFound from '../components/NotFound';
import {
  Example1,
  Example2,
  Example3,
} from '../components/Examples';
// import { InputSearch } from '../components/Input';

import { MainFlexWrapper, MainFlexElement } from '../components/MainWrapper';

import { updateSearchField } from '../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Read more about auth needs:
// https://github.com/ReactTraining/react-router/issues/5155

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import styled from 'styled-components';


const Descr = styled('div')`
  font-style: italic;
  font-size: 14px;
  padding: 10px;
  color: gray;
`;

const routes = [
  {
    path: '/',
    exact: true,
    main: () => <Home />,
    link: { text: 'Home' },
  },
  {
    path: '/example1',
    exact: true,
    main: () => <Example1 />,
    link: { text: 'Example1', descr: 'Simplest map with a marker usage sample' },
  },
  {
    path: '/example2',
    exact: true,
    main: () => <Example2 />,
    link: { text: 'Example2', descr: 'react-geolocated usage example. And also open console then drag & drop the map...' },
  },
  {
    path: '/example3',
    exact: true,
    main: () => <Example3 />,
    link: { text: 'Example3', descr: 'hoc withStateHandlers () example' },
  },
];

class Routes extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    searchField: PropTypes.string.isRequired,
  }

  state = { isMntd: false }

  async componentDidMount() {
    this.state.isMntd = true;

    if(!this.isMntd) {
      this.props.dispatch(updateSearchField({ target: { value: 'tst' } }));
    }
  }

  async componentWillUnMount() {
    this.state.isMntd = false;
  }

  handler = (e) => this.props.dispatch(updateSearchField(e))

  render() {
    return (
      <BrowserRouter>
        <MainFlexWrapper>
          <MainFlexElement>
            {/*
            <InputSearch
              value={this.props.searchField}
              onChange={this.handler}
              placeholder='Input something...'
            />
            */}
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {
                routes.map((route, index) => (
                  route.link ? (
                    <li key={index}>
                      <Link to={route.path}>{route.link.text}</Link>
                      {route.link.descr ? <Descr style={{ paddingLeft: '15px' }}>{route.link.descr}</Descr> : null}
                    </li>
                  ) : null
                ))
              }
              <li>
                <a
                  href='/'
                  onClick={(e) => {
                    e.preventDefault();
                    Swal({
                      title: 'Are you sure?',
                      text: 'You will be redirected to original article.',
                      type: 'warning',
                      showCancelButton: true,
                      confirmButtonText: 'Yes, I got it!',
                      cancelButtonText: 'No, tx'
                    }).then((result) => {
                      if (result.value) {
                        // go head...
                      } else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal(
                          'Cancelled',
                          'You will not be redirected.',
                          'error'
                        );
                      }
                      return result;
                    }).then((result) => {
                      if (result.value) {
                        window.location = 'https://tomchentw.github.io/react-google-maps/#usage--configuration';
                      } else {
                        return false;
                      }
                    });
                  }
                }
                >Original doc</a>
              </li>
            </ul>
          </MainFlexElement>
          <MainFlexElement>
            <Switch>
              {
                routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.main}
                  />
                ))
              }
              <Route exact path='/*' component={NotFound} />
            </Switch>
          </MainFlexElement>
        </MainFlexWrapper>
      </BrowserRouter>
    )
  }
};

// export default Routes;

function mapStateToProps ({ searchField }) {
  return {
    searchField,
  }
}

export default connect(mapStateToProps)(Routes)
