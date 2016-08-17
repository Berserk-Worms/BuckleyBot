import React, { Component } from 'react';

class SignIn extends Component {
  render() {
    return (
      <div className="signin-bg">
        <div className="center-vertical-align">
        <h1 className="title center-item">Sign In and Start Using BuckleyBot</h1>
          <div className="center-item">
            <img className="robo-big-head-img" src="../assets/robo_big_head.png" alt=""/>
          </div>
          <div className="slack-button center-item">
            <a href="https://slack.com/oauth/authorize?scope=identity.basic,identity.email,identity.team,identity.avatar&client_id=68292478995.69302700244&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fslack%2Fusers%2Fauth"><img src="https://api.slack.com/img/sign_in_with_slack.png"/>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
