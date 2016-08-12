import React, { Component } from 'react';

class Oops extends Component {
  render() {
    return (
      <div>
        <div className="upper-vertical-align">
          <h1 className="title center-item">Oops: Something went wrong</h1>
          <div className="center-item">
            <img className="robo-oops-img" src="../assets/robo_oops.png" alt=""/>
          </div>
          <h2 className="title center-item">Please add BuckleyBot to your team</h2>
          <div className="slack-button center-item">
            <a href="https://slack.com/oauth/reflow?scope=bot&client_id=66765912757.67864241282&redirect_uri=http://localhost:8080/slack/teams/auth">
            <img alt="Add to Slack" src="https://platform.slack-edge.com/img/add_to_slack.png" srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" />
            </a>  
          </div>
        </div>
      </div>
    );
  }
}

export default Oops;