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
      <div className="signout-bg">
        <div className="main-center">
          <Grid>
            <Row>
              <Col className="animated rubberBand" lg={12}>
                <img className="robo-img" src="../assets/robo_no_legs_wht_bg.png" alt="BuckleyBot" responsive/>
                <div className="intro-text">
                  <span className="skills">You have Successfully Signed Out</span>
                  <span className="skills">Hope to see you again soon!</span>
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
