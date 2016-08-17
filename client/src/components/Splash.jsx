import React, { Component } from 'react';

class Splash extends Component {
  render() {
    return (
      <div className="splash-bg">
        <div className="center-vertical-align">
        <h1 className="title center-item">BuckleyBot: Slackbot for Jobs</h1>
          <div className="center-item">
            <img className="robo-big-head-img" src="../assets/robo_big_head.png" alt=""/>
          </div>
          <div className="slack-button center-item">
            <a href="https://slack.com/oauth/reflow?scope=bot&client_id=68292478995.69302700244&redirect_uri=http://localhost:8080/slack/teams/auth">
              <img alt="Add to Slack" src="https://platform.slack-edge.com/img/add_to_slack.png" srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" />
            </a>  
          </div>
        </div>
      </div>
    );
  }
}

export default Splash;