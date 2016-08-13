import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Splash from './components/Splash';
import Oops from './components/Oops';
import NotFound from './components/NotFound';
import Profile from './components/Profile';


export default (
  <Route path='/' component={App}>
    <IndexRoute component={Splash} />
    <Route path='profile' component={Profile} />
    <Route path='*' component={NotFound} />
  </Route>
);