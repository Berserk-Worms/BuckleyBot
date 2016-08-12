import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="app-background">
        <div className="center-vertical-align">
        <h1 className="title center-item">BuckleyBot: Slackbot for Students</h1>
          <div className="center-item">
            <img className="robo-big-head-img" src="http://plainicon.com/dboard/userprod/2802_db2aa/prod_thumb/plainicon.com-45277-512px.png" alt=""/>
          </div>
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

export default App;