import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Splash from './components/Splash';
import SignIn from './components/auth/SignIn';
import SignOut from './components/auth/SignOut';
import Auth from './components/auth/Auth';
import Oops from './components/error/Oops';
import NotFound from './components/error/NotFound';
import Profile from './components/profile/Profile';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Splash} />
    <Route path='signin' component={SignIn} />
    <Route path='signout' component={SignOut} />
    <Route path='profile' component={Auth(Profile)} />
    <Route path='oops' component={Oops} />
    <Route path='*' component={NotFound} />
  </Route>
);