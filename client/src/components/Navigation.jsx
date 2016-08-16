import React, { Component } from 'react';
import { Link } from 'react-router';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

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