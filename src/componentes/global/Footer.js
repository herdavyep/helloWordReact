import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './css/Footer.css';

class Footer extends Component {
  static propTypes={
    copyrigh: PropTypes.string
  };
  render() {
    const {copyrigh = "&copy; Heriberto 2018"}=this.props;
    return (
      <div className="Footer">
          <p> {copyrigh} </p>
      </div>
    );
  }
}

export default Footer;
