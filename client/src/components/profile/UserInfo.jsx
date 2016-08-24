import React, { Component } from 'react';
import { Row, Col, Image } from 'react-bootstrap';

class UserInfo extends Component {
  render() {
    return (
      <Row>
        <Col xsHidden={true} sm={5} mdOffset={1} md={4}>
          <Image src={this.props.photo} responsive rounded />
        </Col>
        <Col className="center-info" xs={12} sm={7} md={7}>
          <h1>{this.props.name}</h1>
          <h3>{this.props.location}</h3>
        </Col>
      </Row>
    );
  }
}

export default UserInfo;

