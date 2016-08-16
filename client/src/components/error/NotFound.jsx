import React, { Component } from 'react';

class NotFound extends Component {
  render() {
    return (
      <div>
        <div className="upper-vertical-align">
          <h1 className="title center-item">Oops: 404 Page was not found</h1>
          <div className="center-item">
            <img className="robo-oops-img" src="../assets/robo_oops.png" alt=""/>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;