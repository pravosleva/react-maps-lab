import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'; // , Redirect
import Select from 'react-select';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Read more about auth needs:
// https://github.com/ReactTraining/react-router/issues/5155
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import styled from 'styled-components';
import { Home } from '../components/Home';
import NotFound from '../components/NotFound';
import {
  Example1,
  Example2,
  Example3,
  Example4, // Bad pattern
  Example5, // Good pattern
} from '../components/Examples';
// import { InputSearch } from '../components/Input';
import { MainFlexWrapper, MainFlexElement } from '../components/MainWrapper';
import {
  // updateSearchField,
  updateReactSelectSelectedOption,
} from '../actions';

const options = [
  { value: 'bigData_10k', label: 'Big data 700 kB' },
  { value: 'bigData_100k', label: 'Big data 7 MB' },
];
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
    link: { text: 'Example3', descr: 'HOC & withStateHandlers () example' },
  },
  {
    path: '/example4',
    exact: true,
    main: () => <Example4 />,
    link: { text: 'Example4', descr: 'Markers and clustering. Markers taken from the store and put to HOC state as modified array. Big data 700 kB sample. Attention! Antipattern commented (use Example5 instead)' },
  },
  {
    path: '/example5',
    exact: true,
    main: () => <Example5 />,
    link: { text: 'Example5', descr: 'Better HOC pattern of Example4.' },
  },
];

class Routes extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    searchField: PropTypes.string,
    selectedOption: PropTypes.object,
  }

  // handler = (e) => this.props.dispatch(updateSearchField(e))

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
                      {
                        route.link.text === 'Example5'
                        ? (
                          <Select
                            value={this.props.selectedOption}
                            onChange={async (e) => {
                              // console.log(e);
                              await this.props.dispatch(updateReactSelectSelectedOption(e));
                            }}
                            options={options}
                          />
                        ) : null
                      }
                    </li>
                  ) : null
                ))
              }
              <li><hr className='style-two'/></li>
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

Routes.defaultProps = {
  searchField: '',
  selectedOption: {},
};

function mapStateToProps ({ searchField, markers }) {
  return {
    searchField,
    selectedOption: markers.selectedOption,
    specialKey: markers.specialKey,
  }
}

export default connect(mapStateToProps)(Routes)
