import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';

const BASE_URL = window.location.origin;

class Oops extends Component {
  render() {
    return (
      <div className="oops">
        <div className="main-center">
          <Grid>
            <Row>
              <Col className="animated bounce" lg={12}>
                <img className="robo-img" src="../assets/searching_plain.png" alt="BuckleyBot" />
                <div className="intro-text">
                  <div className="skills">Oops: Please add BuckleyBot to your team before signing in</div>
                  <span className="slack-btn-container">
                    <Button className="slack-button" bsSize="large" bsStyle="danger" href={`https://slack.com/oauth/reflow?scope=bot&client_id=66765912757.67864241282&redirect_uri=${BASE_URL}/slack/teams/auth`}> 
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