import React, { Component } from 'react';
import PropTypes from 'prop-types';

//import FormCrearAlmacen from './FormCrearAlmacen';

import './css/Content.css';

class Content extends Component {
  constructor(){
    super();
    this.state = {    
    };
  }
  static propTypes = {
    body: PropTypes.object.isRequired
  };
  
  render() {
    const { body } = this.props;
    return (
      <div className="Content col-md-6 ">
        {body}
      </div>
    );
  }
}

export default Content;
