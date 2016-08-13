import React, { Component } from 'react';
import { Grid, Jumbotron } from 'react-bootstrap';

import UserInfo from './UserInfo';
import JobList from './JobList';

class Profile extends Component {
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