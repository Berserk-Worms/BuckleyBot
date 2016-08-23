import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import JobEntry from './JobEntry';
import { connect } from 'react-redux';

class JobList extends Component {

  render() {
    return (
      <Row>
        {this.props.jobs.map( (job, index) => {
          return (
            <Col smOffset={1} sm={10} mdOffset={0} md={6} key={index}>
              <JobEntry 
                company={job.company}
                title={job.title}
                location={job.location}
                publishDate={job.publishDate}
                link={job.link}
                key={index}
              />
            </Col>
          );
        })}
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return { 
    jobs: state.user.jobs
   };
}

export default connect(mapStateToProps)(JobList);