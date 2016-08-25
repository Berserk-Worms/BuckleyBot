import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';


class SignIn extends Component {
  render() {
    return (
      <div className="auth-bg">
        <div className="main-center">
          <Grid>
            <Row>
              <Col className="animated rubberBand" lg={12}>
                <img className="robo-img" src="../assets/searching.png" alt="BuckleyBot" />
                <div className="intro-text">
                  <div className="skills">Sign in through slack to view all of your</div>
                  <div className="skills"> saved jobs and start applying now!</div>
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
