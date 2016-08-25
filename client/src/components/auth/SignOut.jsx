import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Grid, Row, Col, Button } from 'react-bootstrap';


class SignOut extends Component {

  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return (
      <div className="auth-bg">
        <div className="main-center">
          <Grid>
            <Row>
              <Col className="animated rubberBand" lg={12}>
                <img className="robo-img" src="../assets/searching_default.png" alt="BuckleyBot" />
                <div className="intro-text">
                  <div className="skills">You have successfully signed out.</div>
                  <div className="skills">Hope to see you back soon!</div>
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

export default connect(null, actions)(SignOut);
