import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'; // , Redirect
import Select from 'react-select';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Read more about auth needs:
// https://github.com/ReactTraining/react-router/issues/5155
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
// import debounce from 'lodash.debounce';
import './_prot';
import { Home } from '../components/Home';
import NotFound from '../components/NotFound';
import {
  LeftFlexContainer,
  SearchSection,
  ExamplesSection,
  OriginalDocSection,
} from '../components/LeftSide';
import { TogglerBtn } from '../components/TogglerBtn';
import {
  Example1,
  Example2,
  Example3,
  Example4, // Bad pattern
  Example5, // Good pattern
  Example6,
  Example7,
  Example8,
  Example9,
  Example10,
  Example11, // pigeon-maps with OpenStreetMap simplest sample
  Example12,
  Example13,
  Example14,
} from '../components/Examples';
import { Issue1 } from '../components/Issues/Issue1';
import { Issue2 } from '../components/Issues/Issue2';
import { Issue3 } from '../components/Issues/Issue3';
import { InputSearch } from '../components/Input';
import { MainFlexWrapper, MainFlexElement } from '../components/MainWrapper';
import {
  updateSearchField,
  updateSearchFieldValue,
  updateReactSelectSelectedOption,
  updateCurrentPage,
} from '../actions';


// console.log(typeof String.prototype.checkTheSubstr);

const searchOptions = [
  { value: 'all', label: 'all' },
  { value: 'react-google-maps', label: 'react-google-maps' },
  { value: 'google-map-react', label: 'google-map-react' },
  { value: 'pigeon-map', label: 'pigeon-map' },
  { value: 'OpenStreetMap', label: 'OpenStreetMap' },
  { value: 'react-mapbox-gl', label: 'react-mapbox-gl' },
  { value: 'react-slick', label: 'react-slick' },
];
const Descr = styled('div')`
  font-style: italic;
  font-size: 14px;
  padding: 10px;
  white-space: pre-line;
`;
const routes = [
  {
    path: '/',
    exact: true,
    main: () => <Home />,
    link: { text: 'Home' },
    // exampleOf: str|arr,
    // articlesLinks: obj|arr, // For example: [{ link, text }]
    // githubLink: str,
  },
  {
    path: '/example1',
    exact: true,
    main: () => <Example1 />,
    link: { text: 'Example1', descr: 'Simplest map with a marker usage sample.' },
    exampleOf: 'react-google-maps',
  },
  {
    path: '/example2',
    exact: true,
    main: () => <Example2 />,
    link: { text: 'Example2', descr: 'react-geolocated usage example\n(but only for external routing for the port!)\nAnd also open console then drag & drop the map...' },
    exampleOf: ['react-google-maps', 'react-geolocated'],
  },
  {
    path: '/example3',
    exact: true,
    main: () => <Example3 />,
    link: { text: 'Example3', descr: 'HOC & withStateHandlers () example. Slider test.' },
    exampleOf: ['react-slick'],
  },
  {
    path: '/example4',
    exact: true,
    main: () => <Example4 />,
    link: { text: 'Example4', descr: `Markers and clustering.\nMarkers taken from the store and put to HOC state as modified array.\nBig json data sample. Attention! Antipattern commented (use Example5 instead)` },
    exampleOf: 'react-google-maps',
  },
  {
    path: '/example5',
    exact: true,
    main: () => <Example5 />,
    link: { text: 'Example5', descr: 'Better HOC pattern for Google Map instead of Example4.\nMap: minZoom & maxZoom as fixed options. Clusterer: maxZoom as fixed param.' },
    exampleOf: 'react-google-maps',
  },
  {
    path: '/example6',
    exact: true,
    main: () => <Example6 />,
    link: { text: 'Example6', descr: 'Simple component experience.\n(FckUp)' },
    exampleOf: 'google-map-react',
  },
  {
    path: '/example7',
    exact: true,
    main: () => <Example7 />,
    link: { text: 'Example7', descr: 'HOC test for example. supercluster test.\n(FckUp)' },
    exampleOf: 'google-map-react',
    githubLink: 'https://github.com/mapbox/supercluster',
  },
  {
    path: '/example8',
    exact: true,
    main: () => <Example8 />,
    link: { text: 'Example8', descr: 'Original sample.' },
    exampleOf: 'google-map-react',
    githubLink: 'https://github.com/Tim152/clustering-google-map-react',
  },
  {
    path: '/example9',
    exact: true,
    main: () => <Example9 />,
    link: { text: 'Example9', descr: 'Google Map API KEY test.' },
  },
  {
    path: '/example10',
    exact: true,
    main: () => <Example10 />,
    link: { text: 'Example10', descr: 'SearchBox test.' },
    exampleOf: 'react-google-maps',
  },
  {
    path: '/example11',
    exact: true,
    main: () => <Example11 />,
    link: { text: 'Example11', descr: 'Marker, Overlay test.' },
    exampleOf: ['pigeon-map', 'OpenStreetMap'],
  },
  {
    path: '/example12',
    exact: true,
    main: () => <Example12 />,
    link: { text: 'Example12', descr: 'Layer, Feature test.' },
    exampleOf: ['react-mapbox-gl', 'OpenStreetMap'],
  },
  {
    path: '/example13',
    exact: true,
    main: () => <Example13 />,
    link: { text: 'Example13', descr: 'ReactMapboxGlCluster test.' },
    exampleOf: ['react-mapbox-gl', 'react-mapbox-gl-cluster', 'OpenStreetMap'],
  },
  {
    path: '/example14',
    exact: true,
    main: () => <Example14 />,
    link: { text: 'Example14', descr: 'Marker, Cluster, Popup. In process...' },
    exampleOf: ['react-mapbox-gl', 'OpenStreetMap'],
    githubLink: 'https://github.com/alex3165/react-mapbox-gl/blob/HEAD/docs/API.md#cluster',
  },
  {
    path: '/issue1',
    exact: true,
    main: () => <Issue1 />,
    link: { text: 'Issue1', descr: 'LeftSidebar\n(retractable for max-width 767px).\nHOC experience like uremont.com' },
  },
  {
    path: '/issue2',
    exact: true,
    main: () => <Issue2 />,
    link: { text: 'Issue2', descr: 'Retractable List.\nHOC experience like uremont.com' },
  },
  {
    path: '/issue3',
    exact: true,
    main: () => <Issue3 />,
    link: { text: 'Issue3', descr: 'Issues #1 and #2 combination.\nHOC experience like uremont.com' },
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
    selectedOption: PropTypes.object.isRequired,
  }

  // DEFAULT HANDLER:
  // handler = (text) => {
  //   this.props.dispatch(updateSearchFieldValue(text));
  // }

  // DEBOUNCE WAY 1:
  handler = // debounce(
    (text) => this.props.dispatch(updateSearchFieldValue(text)) // ,
  //   2000,
  // )

  // DEBOUNCE WAY 1:
  // componentWillUnmount() {
  //   this.handler.cancel();
  // }

  componentDidMount() {
    this.props.dispatch(updateCurrentPage({ routePath: window.location.pathname }));
  }

  isThisCurrentRoute = (route) => route.path === this.props.currentPage.routePath

  getRemoteData = ({ url, method = 'GET', arg = {} }) => {
    const body = new FormData();
    const params = [
      // 'service_id',
    ];

    params.map((p) => arg[p] ? body.append([p], arg[p]) : false);

    return fetch(url, { method, body })
      .then((res) => console.log(res))
      .then((res) => {
        if (res.ok) {
          console.log('SUCCESS');
          return res.json();
        }
        throw (['res.ok is not ok']); // eslint-disable-line no-throw-literal
      })
      .then((json) => {
        console.log(json);
      })
      // Need to set markers to store by this.props.dispatch(updateMarkers(markers))
      .then((json) => {
        Swal({
          title: 'Ok',
          text: 'Response received, but this functional in process...',
          type: 'info',
        });
      })
      // in process...
      .catch((err) => {
        Swal({
          title: 'Sorry',
          html: Array.isArray(err)
            ? `<ul style='list-style-type: none; padding: 0;'>${err.map((e) => `<li>${e}</li>`)}</ul>`
            : `<div>${err}</div>`,
          type: 'error',
        });
      });
  }

  render() {
    return (
      <BrowserRouter>
        <MainFlexWrapper>
          <MainFlexElement opened={this.props.currentPage.listOpenedOnMobile}>
            <LeftFlexContainer>
              <SearchSection>
                <InputSearch
                  value={this.props.searchFieldValue}
                  onChange={(e) => this.handler(e.target.value)}
                  placeholder='Search by substring...'
                />
                {/*
                <Select
                  value={this.props.searchField}
                  onChange={(o) => this.props.dispatch(updateSearchField(o))}
                  options={searchOptions}
                />
                */}
              </SearchSection>

              <ExamplesSection>
                <ul style={{ listStyleType: 'none', padding: '0', marginTop: '0', marginBottom: '0' }}>
                  {
                    routes.filter((r) => (
                      !this.props.searchFieldValue
                        ? true
                        : r.link.descr &&  this.props.searchFieldValue.checkAsSubstrByWords(r.link.descr)
                          ? true
                            : r.exampleOf
                              ? r.exampleOf.includes(this.props.searchFieldValue)
                              : false
                    )).map((route, index) => (
                      route.link ? (
                        <li key={index} style={{ padding: '10px 20px 10px 20px', backgroundColor: this.isThisCurrentRoute(route) ? '#ABDFF3' : 'transparent' }}>
                          <FlexHeader>
                            <Link
                              to={route.path}
                              onClick={() => this.props.dispatch(updateCurrentPage({ ...this.props.currentPage , routePath: route.path }))}
                            >{route.link.text}</Link>
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
                            route.link.descr ? <Descr style={{ paddingLeft: '15px', color: this.isThisCurrentRoute(route) ? 'inherit' : 'gray' }}>{route.link.descr}</Descr> : null
                          }
                          {
                            route.articlesLinks
                            ? (
                              Array.isArray(route.articlesLinks)
                              ? (
                                <ul>{
                                  route.articlesLinks.map((l) => <li key={Math.random()}><a href={l.link} target='_blank'>{l.text}</a></li>)
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
                                  onChange={async (option) => {
                                    // console.log(e);
                                    if (option.remote === true) {
                                      this.getRemoteData({ url: 'http://dev.uservice.io/customer/map/get-services/', method: 'POST' });
                                      // .then(() => ) // this.props.dispatch(updateReactSelectSelectedOption(option));
                                      return;
                                    }
                                    await this.props.dispatch(updateReactSelectSelectedOption(option));
                                  }}
                                  options={this.props.dataOptions}
                                />
                              </div>
                            ) : null
                          }
                        </li>
                      ) : null
                    ))
                  }
                </ul>
              </ExamplesSection>
              <OriginalDocSection>
                <a
                  href='/'
                  onClick={(e) => {
                    e.preventDefault();
                    Swal({
                      title: 'Are you sure?',
                      text: 'You will be redirected.',
                      type: 'warning',
                      showCancelButton: true,
                      confirmButtonText: 'Yes, I got it!',
                      cancelButtonText: 'No, tx'
                    }).then((result) => {
                      if (result.value) {
                        // go head...
                      } else if (result.dismiss === Swal.DismissReason.cancel) {
                        // Swal('Cancelled', 'You will not be redirected.', 'error');
                      }
                      return result;
                    }).then((result) => {
                      if (result.value) {
                        window.location = 'https://github.com/pravosleva/react-maps-lab';
                      } else {
                        return false;
                      }
                    });
                  }
                }
                ><i style={{ fontSize: '25px' }} className='fa fa-github'></i></a>
              </OriginalDocSection>
            </LeftFlexContainer>
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
          <TogglerBtn
            onClick={() => this.props.dispatch(updateCurrentPage({ ...this.props.currentPage , listOpenedOnMobile: !this.props.currentPage.listOpenedOnMobile }))}
          >
            {this.props.currentPage.listOpenedOnMobile ? <i style={{ fontSize: '30px' }} className='fa fa-bars'></i> : <i style={{ fontSize: '30px' }} className='fa fa-times'></i>}
          </TogglerBtn>
          <ToastContainer autoClose={7000} position='top-right' />
        </MainFlexWrapper>
      </BrowserRouter>
    )
  }
};

// Routes.defaultProps = {
//   selectedOption: {},
// };

function mapStateToProps ({ searchField, searchFieldValue, markers, currentPage }) {
  return {
    searchField,
    searchFieldValue,
    dataOptions: markers.dataOptions,
    selectedOption: markers.selectedOption,
    specialKey: markers.specialKey,
    currentPage,
  }
}

export default connect(mapStateToProps)(Routes);
