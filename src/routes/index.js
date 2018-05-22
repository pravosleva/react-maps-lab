import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Example1 } from '../components/Example1';
import { Home } from '../components/Home';
import NotFound from '../components/NotFound';

import { MainFlexWrapper, MainFlexElement } from '../components/MainWrapper';


const Routes = () => (
<BrowserRouter>
  <MainFlexWrapper>
    <MainFlexElement>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/example1' component={Example1} />

        <Route exact path='/*' component={NotFound} />
      </Switch>
    </MainFlexElement>
  </MainFlexWrapper>
</BrowserRouter>
);

export default Routes;
