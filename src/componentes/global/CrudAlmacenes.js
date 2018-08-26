import React, { Component } from 'react';

import FormEditarAlmacenes from './FormEditarAlmacenes';
import FormCrearAlmacen from './FormCrearAlmacen';

class CrudAlmacenes extends Component {

 
  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div className="col-5">
              <FormCrearAlmacen/>
            </div>
            <div className="col-5">
              <FormEditarAlmacenes/>
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}
export default CrudAlmacenes;
