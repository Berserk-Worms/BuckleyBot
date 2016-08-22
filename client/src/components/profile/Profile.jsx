import React, { Component } from 'react';
import { Grid, Jumbotron } from 'react-bootstrap';

import UserInfo from './UserInfo';
import JobList from './JobList';

import { connect } from 'react-redux';
import * as actions from '../../actions';

class Profile extends Component {

  componentWillMount() {
    // Make server side call to get user
    // This is where we emit an action creator to grab jwt from localstorage, check which user it is
    this.props.getUserData();
    // If proper user, then make API request to slack with user's access token
    // Else messed up jwt -- maybe need to clear jwt and redirect to splash page 
    // --> handling this in getUserData action

    // Get response data and populate components with that data
    // If data doesn't respond properly, then that means we have a faulty access token
    // Then use refresh token to get new access token 
  }

  render() {
    return (
      <Grid>
        <Jumbotron className="contact-card">
          <UserInfo name={this.props.name} location={this.props.location} />
        </Jumbotron>
        <JobList /> 
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return { 
    name: state.user.name,
    location: state.user.location
   };
}

export default connect(mapStateToProps, actions)(Profile);