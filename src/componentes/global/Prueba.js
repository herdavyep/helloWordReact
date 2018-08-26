import React, { Component } from 'react';
import firebase from 'firebase';

class Prueba extends Component {
  constructor () {
    super();
    this.state = {
      
      imagenAlmacen: ''
    };

    this.imagen = this.imagen.bind(this);
  }

  
imagen(event){
    event.preventDefault();
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`/almacenes/${file.name}`);
    const task = storageRef.put(file);

    task.on('state_changed', snapshot => {
        
    }, error => {
        console.log(error.message)
    }, () => {

      storageRef.getDownloadURL().then(url => {

        this.setState ({
          imagenAlmacen: url
        });

      });

    });
}

  render() {
    return (
      <div>
         <input type="file" onChange={this.imagen} />
      </div>
    );

    return (
        <h1>{this.imagenAlmacen}</h1>
    )
  }

}

export default Prueba;
