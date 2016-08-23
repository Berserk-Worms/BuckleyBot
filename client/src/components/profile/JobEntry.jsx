import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';

class JobEntry extends Component {
  render() {
    return (
      <Panel header={this.props.company}>
        <p className="position">{this.props.title}</p>
        <p className="card-info">{this.props.location}</p>
        <p className="card-info">{this.props.publishDate}</p>
        <hr/>
        <p>
          <Button href={this.props.link}>More Info</Button>
        </p>
      </Panel>
    );
  }
}

export default JobEntry;