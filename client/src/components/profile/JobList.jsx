import React, { Component } from 'react';
import { Row, Col, Media } from 'react-bootstrap';

import JobEntry from './JobEntry';


class JobList extends Component {

  render() {
    return (
      <Row>
        <Col smOffset={1} sm={10}>
          <JobEntry />
          <JobEntry />
        </Col>
      </Row>
    );
  }
}

export default JobList;