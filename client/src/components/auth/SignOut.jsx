import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class SignOut extends Component {

  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return (
      <div className="signout-bg">
        <div className="center-vertical-align">
        <h1 className="title center-item">You have successfully signed out</h1>
          <div className="center-item">
            <img className="robo-big-head-img" src="../assets/robo_big_head.png" alt=""/>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(SignOut);
