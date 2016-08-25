import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';

class Oops extends Component {
  render() {
    return (
      <div className="oops">
        <div className="main-center">
          <Grid>
            <Row>
              <Col className="animated bounce" lg={12}>
                <img className="robo-img" src="../assets/robo_oops.png" alt="BuckleyBot" responsive/>
                <div className="intro-text">
                  <span className="skills">Oops: Please add BuckleyBot to you team before signing in</span>
                  <span className="slack-btn-container">
                    <Button className="slack-button" bsSize="large" bsStyle="danger" href="https://slack.com/oauth/reflow?scope=bot&client_id=66765912757.67864241282&redirect_uri=http://localhost:8080/slack/teams/auth"> 
                    <div className="slack-icon"></div>
                    <div className="slack-text">Add to Slack</div>
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

export default Oops;