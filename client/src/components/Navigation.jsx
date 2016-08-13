import React, { Component } from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';

class Navigation extends Component {
  render() {
    return (
      <Navbar className="nav-size" inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">BuckleyBot</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} href="https://slack.com/oauth/authorize?scope=identity.basic,identity.email,identity.team,identity.avatar&client_id=66765912757.67864241282&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fslack%2Fusers%2Fauth">Sign In</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;

// NOTE: the a tag that goes to home may need to be a link tag through react router