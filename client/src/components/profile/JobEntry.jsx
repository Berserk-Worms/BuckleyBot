import React, { Component } from 'react';
import { Media } from 'react-bootstrap';

class JobEntry extends Component {
  render() {
    return (
      <Media>
       <Media.Left>
          <img width={64} height={64} src="http://placehold.it/150x150" alt="Image"/>
        </Media.Left>
        <Media.Body>
          <Media.Heading>Media Heading</Media.Heading>
          <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
        </Media.Body>
      </Media>
    );
  }
}

export default JobEntry;

