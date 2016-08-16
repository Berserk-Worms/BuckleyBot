import React, { Component } from 'react';
import Navigation from './Navigation';
import { browserHistory } from 'react-router'; 

class App extends Component {

  componentWillMount() {
    // Check if url came with a query parameter containing token
    // if so, set the token in local storage as jwt
    let token = this.props.location.query.token;
    if (token) {
      localStorage.setItem('jwt', token);
    }
    // Now check if localstorage has jwt
    if (localStorage.getItem('jwt')) {
      // if so, then do clientside redirect to profile page
      browserHistory.push('/profile');
    }
  }

  render() {
    return (
      <div>
        <Navigation />
        {this.props.children}
      </div>
    );
  }
}

export default App;