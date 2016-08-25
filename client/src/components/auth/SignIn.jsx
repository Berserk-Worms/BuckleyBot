import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';


class SignIn extends Component {
  render() {
    return (
      <div className="signin-bg">
        <div className="main-center">
          <Grid>
            <Row>
              <Col className="animated bounce" lg={12}>
                <img className="robo-img" src="../assets/robo_no_legs_wht_bg.png" alt="BuckleyBot" responsive/>
                <div className="intro-text">
                  <span className="skills">Sign in through slack to view all of your saved jobs and start applying now!</span>
                  <span className="slack-btn-container">
                    <Button className="slack-button" bsSize="large" bsStyle="danger" href="https://slack.com/oauth/authorize?scope=identity.basic,identity.email,identity.team,identity.avatar&client_id=66765912757.67864241282&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fslack%2Fusers%2Fauth"> 
                    <div className="slack-icon"></div>
                    <div className="slack-text">Sign In</div>
                    </Button> 
                  </span>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default SignIn;

// <div className="center-vertical-align text-center">
//   <h1 >Sign in</h1>
//   <p>Sign in through slack to view all of your saved jobs and start applying now!</p>
//     <img className="" src="../assets/robo_big_head.png" alt=""/>
//   <div className="slack-button center-item">
//     <a href="https://slack.com/oauth/authorize?scope=identity.basic,identity.email,identity.team,identity.avatar&client_id=66765912757.67864241282&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fslack%2Fusers%2Fauth"><img src="https://api.slack.com/img/sign_in_with_slack.png"/>
//     </a>
//   </div>
// </div>
