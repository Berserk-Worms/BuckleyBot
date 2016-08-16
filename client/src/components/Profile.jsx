import React, { Component } from 'react';
import { Grid, Jumbotron } from 'react-bootstrap';

import UserInfo from './UserInfo';
import JobList from './JobList';

class Profile extends Component {

  componentWillMount() {
    // Grab jwt from localstorage, check which user it is

    // If proper user, then make API request to slack with user's access token
    // Else messed up jwt -- maybe need to clear jwt and redirect to splash page

    // Get response data and populate components with that data
    // If data doesn't respond properly, then that means we have a faulty access token
    // Then use refresh token to get new access token 
  }

  render() {
    return (
      <Grid>
        <Jumbotron className="contact-card">
          <UserInfo />
        </Jumbotron>
        <JobList /> 
      </Grid>
    );
  }
}

export default Profile;