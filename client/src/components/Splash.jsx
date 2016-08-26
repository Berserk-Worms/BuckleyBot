import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';

const BASE_URL = window.location.origin;

class Splash extends Component {
  render() {
    return (
      <div>
        
        <header>
          <Grid>
            <Row>
              <Col className="animated pulse" lg={12}>
                <img className="robo-img hide-on-lg" src="../assets/searching.png" alt="BuckleyBot"/>
                <img className="robo-img hide-on-sm" src="../assets/searching_default.png" alt="BuckleyBot"/>
                <div className="intro-text">
                  <span className="name">BuckleyBot</span>
                  <hr className="star-light hide-on-lg" />
                  <span className="skills">Come with me if you want a job</span>
                  <span className="slack-btn-container">
                    <Button className="slack-button" bsSize="large" bsStyle="primary" href={`https://slack.com/oauth/reflow?scope=bot&client_id=66765912757.67864241282&redirect_uri=${BASE_URL}/slack/teams/auth`}> 
                    <div className="slack-icon"></div>
                    <div className="slack-text">Add to Slack</div>
                    </Button> 
                  </span>
                </div>
                <i className="fa fa-chevron-down chevron hide-on-sm" aria-hidden="true"></i>
              </Col>
            </Row>
          </Grid>
        </header>

        <section className="start">
          <Grid>
              <Row>
                <Col lg={12} className="text-center">
                  <h2 className="title">How to Get Started</h2>
                  <hr className="star-primary" />
                </Col>
              </Row>
              <Row>
                <Col sm={6} mdOffset={1} md={5} lgOffset={1} lg={5} className="text-center">
                  <div className="how-to">
                    <i className="fa fa-plus-circle icon-style" aria-hidden="true"></i>
                    <p className="section-content">Adding Buckley to your team is a breeze -- just click Add to Slack.</p>
                  </div>
                  <div className="how-to">
                    <i className="fa fa-commenting icon-style" aria-hidden="true"></i>
                    <p className="section-content">Once authorized, Buckley will work with you to find jobs that are a great fit. It’s that easy.</p>
                  </div>
                  <div className="how-to">
                    <Button className="slack-button" bsSize="large" bsStyle="primary" href={`https://slack.com/oauth/reflow?scope=bot&client_id=66765912757.67864241282&redirect_uri=${BASE_URL}/slack/teams/auth`}> 
                    <div className="slack-icon"></div>
                    <div className="slack-text">Add to Slack</div>
                    </Button> 
                  </div>
                </Col>
                <hr className="hide-on-lg hr-margin" />
                <Col sm={6} md={5} lg={5}>
                  <img className="slack-add-pic z-depth-2" src="../../assets/intro.gif" alt="" />
                </Col>
            </Row>
          </Grid>
        </section>

        <section className="about">
          <Grid>
              <Row>
                <Col lg={12} className="text-center">
                  <h2 className="title">Personalize Your Experience</h2>
                  <hr className="star-light" />
                </Col>
              </Row>
              <Row>
                <Col sm={6} mdOffset={1} md={5} lgOffset={1} lg={5}>
                    <img className="slack-add-pic z-depth-2" src="../../assets/julius.png" alt="" />
                </Col>
                <hr className="hide-on-lg hr-margin" />
                <Col sm={6} md={5} lg={5} className="text-center">
                  <div className="how-to">
                    <i className="fa fa-user icon-style" aria-hidden="true"></i>
                    <p className="section-content">To view and manage your saved jobs, simply sign in on buckleybot.com using your Slack account.</p>
                  </div>
                  <div className="how-to">
                    <i className="fa fa-tachometer icon-style" aria-hidden="true"></i>
                    <p className="section-content">Your dashboard is automatically synced from your conversations with Buckley, so nothing is ever lost.</p>
                  </div>
                </Col>
            </Row>
          </Grid>
        </section>

        <footer className="text-center">
          <div className="footer-above">
            <Grid>
              <Row>
                <Col>
                  <img className="robo-img-sm" src="../assets/searching.png" alt="BuckleyBot" />
                  <div>Made with ☕ by: Billy, Jeff, Justin, and Pranay
                    <a target="_blank" href="https://github.com/Berserk-Worms/BuckleyBot"> (Github)</a>
                  </div>
                  <div>Robot icon designed by: <a target="_blank" href="http://www.flaticon.com/free-icon/searching_202483#term=robot&page=1&position=6" title="Freepik">Freepik</a></div>
                  <div>Banner designed by: <a target="_blank" href="http://www.freepik.com/free-vector/realistic-workplace-elements_798002.htm">Freepik</a></div>
                  
                </Col>
              </Row>
            </Grid>
          </div>
          <div className="footer-below">
            <Grid>
              <Row>
                <Col lg={12}>
                  &copy; buckleybot.com 2016
                </Col>
              </Row>
            </Grid>
          </div>
        </footer>

      </div>
    );
  }
}

export default Splash;