import React, { Component } from 'react';

import './css/Content.css';

class NavBar extends Component {

  constructor(){
    super();
    this.state = {
      
    };

  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
          <a href="" className="text_white">
            Task
          </a>
      </nav>
    );
  }
}

export default NavBar;
