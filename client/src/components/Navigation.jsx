import React, { Component } from 'react';
import { Link } from 'react-router';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';


const authUrl = "https://slack.com/oauth/authorize?scope=identity.basic,identity.email,identity.team,identity.avatar&client_id=66765912757.67864241282&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fslack%2Fusers%2Fauth";

class Navigation extends Component {

  renderLinks() {
    let route = '/signin';
    let text = 'Sign in';

    if (this.props.authenticated) { 
      route = '/signout';
      text = 'Sign Out';
    }

    return (
      <LinkContainer to={route}>
        <NavItem eventKey={1}>{text}</NavItem>
      </LinkContainer>
    );
    
  }

  render() {
    return (
      <Navbar className="nav-size" inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}>BuckleyBot</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {this.renderLinks()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Navigation);