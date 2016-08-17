import React, { Component } from 'react';
import { Row, Col, Image } from 'react-bootstrap';


class UserInfo extends Component {
  render() {
    return (
      <Row>
        <Col sm={5}>
          <Image  src="../assets/robo_head.png" responsive rounded />
        </Col>
        <Col sm={7}>
          <h1>{this.props.name}</h1>
          <h3>Location</h3>
        </Col>
      </Row>
    );
  }
}

export default UserInfo;