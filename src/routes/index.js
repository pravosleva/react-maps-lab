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
  Example6,
  // Example7,
  Example8,
} from '../components/Examples';
/// import { InputSearch } from '../components/Input';
import { MainFlexWrapper, MainFlexElement } from '../components/MainWrapper';
import {
  updateSearchField,
  updateReactSelectSelectedOption,
} from '../actions';

const searchOptions = [
  { value: 'all', label: 'all' },
  { value: 'react-google-map', label: 'react-google-map' },
  { value: 'google-map-react', label: 'google-map-react' },
];
const dataOptions = [
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
    exampleOf: 'react-google-maps',
    // articlesLinks: str|arr, [{ link, text }]
    // githubLink: srt,
  },
  {
    path: '/example1',
    exact: true,
    main: () => <Example1 />,
    link: { text: 'Example1', descr: 'Simplest map with a marker usage sample' },
    exampleOf: 'react-google-maps',
  },
  {
    path: '/example2',
    exact: true,
    main: () => <Example2 />,
    link: { text: 'Example2', descr: 'react-geolocated usage example (but only for external routing for the port!). And also open console then drag & drop the map...' },
    exampleOf: ['react-google-maps', 'react-geolocated'],
  },
  {
    path: '/example3',
    exact: true,
    main: () => <Example3 />,
    link: { text: 'Example3', descr: 'HOC & withStateHandlers () example' },
    exampleOf: null,
  },
  {
    path: '/example4',
    exact: true,
    main: () => <Example4 />,
    link: { text: 'Example4', descr: `Markers and clustering. Markers taken from the store and put to HOC state as modified array. Big json data sample. Attention! Antipattern commented (use Example5 instead)` },
    exampleOf: 'react-google-maps',
  },
  {
    path: '/example5',
    exact: true,
    main: () => <Example5 />,
    link: { text: 'Example5', descr: 'Better HOC pattern for Google Map instead of Example4. Map: minZoom & maxZoom as fixed options. Clusterer: maxZoom as fixed param.' },
    exampleOf: 'react-google-maps',
  },
  {
    path: '/example6',
    exact: true,
    main: () => <Example6 />,
    link: { text: 'Example6', descr: 'Simple component experience.' },
    exampleOf: 'google-map-react',
  },
  {
    path: '/example8',
    exact: true,
    main: () => <Example8 />,
    link: { text: 'Example8', descr: 'Original sample.' },
    exampleOf: 'google-map-react',
    articlesLinks: { link: 'https://habr.com/post/334644/', text: 'About it on habr' },
    githubLink: 'https://github.com/Tim152/clustering-google-map-react',
  },
];
const FlexHeader = styled('div')`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

class Routes extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    searchField: PropTypes.object.isRequired,
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
            <div style={{ 'padding': '10px 10px 10px 15px' }}>
              <Select
                value={this.props.searchField}
                onChange={(o) => this.props.dispatch(updateSearchField(o))}
                options={searchOptions}
              />
            </div>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
              {
                routes.filter((r) => (
                  this.props.searchField.value === 'all'
                  ? true
                  : (
                    r.exampleOf
                    ? r.exampleOf.includes(this.props.searchField.value)
                    : false
                  )
                )).map((route, index) => (
                  route.link ? (
                    <li key={index} style={{ padding: '0 0 5px 0' }}>
                      <FlexHeader>
                        <Link to={route.path}>{route.link.text}</Link>
                        {
                          route.githubLink
                          ? <a style={{ marginLeft: 'auto'}} href={route.githubLink} target='_blank'><i style={{ fontSize: '25px' }} className='fa fa-github'></i></a>
                          : null
                        }
                      </FlexHeader>
                      {
                        route.exampleOf
                        ? <ul style={{ marginTop: '10px' }}>{
                          Array.isArray(route.exampleOf)
                          ? (
                            route.exampleOf.map((e) => <li key={Math.random()}><strong>{e}</strong></li>)
                          ) : <li><strong>{route.exampleOf}</strong></li>
                        }</ul>
                        : null
                      }
                      {
                        route.link.descr ? <Descr style={{ paddingLeft: '15px' }}>{route.link.descr}</Descr> : null
                      }
                      {
                        route.articlesLinks
                        ? (
                          Array.isArray(route.articlesLinks)
                          ? (
                            <ul>{
                              route.articlesLinks.map((l) => (
                                <li><a href={l.link} target='_blank'>{l.text}</a></li>
                              ))
                            }</ul>
                          ) : <ul><li><a href={route.articlesLinks.link} target='_blank'>{route.articlesLinks.text}</a></li></ul>
                        ) : null
                      }
                      {
                        route.link.text === 'Example5'
                        ? (
                          <div style={{ 'padding': '0 10px 10px 15px' }}>
                            <Select
                              value={this.props.selectedOption}
                              onChange={async (e) => {
                                // console.log(e);
                                await this.props.dispatch(updateReactSelectSelectedOption(e));
                              }}
                              options={dataOptions}
                            />
                          </div>
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
