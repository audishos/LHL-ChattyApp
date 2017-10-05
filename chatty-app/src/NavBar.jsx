import React, { Component } from 'react';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">
          <i className="fa fa-comments-o" aria-hidden="true"></i>
          Chatty
        </a>
        <span className="navbar-user-count">{this.props.connectedUserCount} user(s) online <i className="fa fa-users" aria-hidden="true"></i>
        </span>
      </nav>
    );
  }
}

export default NavBar;
