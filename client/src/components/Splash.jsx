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
                <img className="robo-img" src="../assets/searching.png" alt="BuckleyBot"/>
                <div className="intro-text">
                  <span className="name">BuckleyBot</span>
                  <hr className="star-light hide-on-lg" />
                  <span className="skills">Slackbot for Jobseekers</span>
                  <span className="slack-btn-container">
                    <Button className="slack-button" bsSize="large" bsStyle="danger" href={`https://slack.com/oauth/reflow?scope=bot&client_id=66765912757.67864241282&redirect_uri=${BASE_URL}/slack/teams/auth`}> 
                    <div className="slack-icon"></div>
                    <div className="slack-text">Add to Slack</div>
                    </Button> 
                  </span>
                </div>
              </Col>
            </Row>
          </Grid>
        </header>

        <section className="start">
          <Grid>
              <Row>
                <Col lg={12} className="text-center">
                  <h2 className="title">How to Get Start</h2>
                  <hr className="star-primary" />
                </Col>
              </Row>
              <Row>
                <Col lgOffset={1} lg={5} className="section-text">
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam quis eius quod. Commodi sunt, enim facere, consequatur veniam fugiat modi consectetur sapiente dolore laudantium tempora consequuntur, dicta dolores voluptatum harum.</p>
                </Col>
                <Col lg={6}>
                  <img className="slack-add-pic" src="../../assets/slack_add.png" alt="" />
                </Col>
            </Row>
          </Grid>
        </section>

        <section className="contact">
          <Grid>
              <Row>
                <Col lg={12} className="text-center">
                  <h2 className="title">Contact</h2>
                  <hr className="star-light" />
                </Col>
              </Row>
              <Row>
                <Col lgOffset={2} lg={4}>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam quis eius quod. Commodi sunt, enim facere, consequatur veniam fugiat modi consectetur sapiente dolore laudantium tempora consequuntur, dicta dolores voluptatum harum.</p>
                </Col>
                <Col lg={4}>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam quis eius quod. Commodi sunt, enim facere, consequatur veniam fugiat modi consectetur sapiente dolore laudantium tempora consequuntur, dicta dolores voluptatum harum.</p>
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
                  <div>Made by: Billy, Jeff, Justin, Pranay
                    <a target="_blank" href="https://github.com/Berserk-Worms/BuckleyBot"> (Github)</a>
                  </div>
                  <div>Robot icon designed by <a href="http://www.flaticon.com/free-icon/searching_202483#term=robot&page=1&position=6" title="Freepik">Freepik</a></div>
                  <div>Banner designed by <a href="http://www.freepik.com/free-vector/realistic-workplace-elements_798002.htm">Freepik</a></div>
                  
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