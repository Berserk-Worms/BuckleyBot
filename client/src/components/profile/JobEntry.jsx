import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../../actions';


class JobEntry extends Component {

  onDeleteEntry() {
    this.props.deleteJob(this.props.jobId, this.props.index);
  }

  render() {
    return (
      <Panel header={this.props.company}>
        <p className="position">{this.props.title}</p>
        <p className="card-info">{this.props.location}</p>
        <p className="card-info">{this.props.publishDate}</p>
        <hr/>
        <p>
          <Button target="_blank" href={this.props.link} bsStyle="primary">More Info</Button>
          <Button onClick={this.onDeleteEntry.bind(this)} bsStyle="danger" className="button-margin">Delete</Button>
        </p>
      </Panel>
    );
  }
}

export default connect(null, actions)(JobEntry);