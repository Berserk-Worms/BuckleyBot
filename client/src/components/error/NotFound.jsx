import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';

class NotFound extends Component {
  render() {
    return (
  <div className="oops">
    <div className="main-center">
      <Grid>
        <Row>
          <Col className="animated bounce" lg={12}>
            <img className="robo-img" src="../assets/searching_plain.png" alt="BuckleyBot" />
            <div className="intro-text">
              <div className="skills">Oops: Page Not Found</div>
              <span className="slack-btn-container">
                <Button className="slack-button" bsSize="large" bsStyle="danger" href="/"> 
                  <div className="slack-icon"></div>
                  <div className="slack-text">Back to Home</div>
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

export default NotFound;