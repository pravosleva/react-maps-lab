import React from 'react';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import { Home } from '../components/Home';
import NotFound from '../components/NotFound';
import { Example1 } from '../components/Example1';
import { Example2 } from '../components/Example2';
// import { Example3 } from '../components/Example3';

import { MainFlexWrapper, MainFlexElement } from '../components/MainWrapper';

// Read more about auth needs:
// https://github.com/ReactTraining/react-router/issues/5155

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


const routes = [
  {
    path: '/',
    exact: true,
    main: () => <Home />,
    link: { text: 'Home', descr: 'This is examples of Google Map usage.' },
  },
  {
    path: '/example1',
    exact: true,
    main: () => <Example1 />,
    link: { text: 'Example1' },
  },
  {
    path: '/example2',
    exact: true,
    main: () => <Example2 />,
    link: { text: 'Example2' },
  },
];

const Routes = () => (
<BrowserRouter>
  <MainFlexWrapper>
    <MainFlexElement>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {
          routes.map((route, index) => {
            if (route.link) {
              return (
                <li>
                  <Link to={route.path}>{route.link.text}</Link>
                  {route.link.descr ? <p style={{ paddingLeft: '15px' }}>{route.link.descr}</p> : null}
                </li>
              )
            }
          })
        }
        <li>
          <a href='#' onClick={
            (e) => {
              e.preventDefault();
              Swal({
                title: 'Are you sure?',
                text: 'You will be redirected to original article.',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, I got it!',
                cancelButtonText: 'No'
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
);

export default Routes;
