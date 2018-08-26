import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from './global/Header';
import Content from './global/Content';
import Footer from './global/Footer';
//import NavBar from './global/NavBar';



import items from '../data/menu';
//<Header title="Heri" items={items}/>

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  hola(id){
    console.log(id)
  }
  render() {
    const{ children } = this.props;
    return (
      <div className="App">
        <Header title="Heri" items={items}/>
        <Content body={children}/>
        <Footer copyright="CrashPromo 2018"/>
            
      </div>
    );
  }
}

export default App;
