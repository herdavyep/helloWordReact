import React, { Component } from 'react';
import firebase from 'firebase';

import './css/VerAlmacenes.css';

class VerAlmacenes extends Component {

  constructor(){
    super();
    this.state = {
      pictures: [],
      keyAlmacenes: []

    };
    
  }

  componentWillMount(){

    firebase.database().ref('almacen/almacenes').on('child_added', snapshot => {
      this.setState({
        pictures: this.state.pictures.concat(snapshot.val()),
        keyAlmacenes: snapshot.key
      });
      console.log("componentWillMount antes"+this.state.keyAlmacenes);
    });

  }

  /*componentDidMount(){
    firebase.database().ref('almacen/almacenes').on('child_removed', snap => {
			for(let i = 0; i < this.state.keyAlmacenes.length; i++) {
				if(this.state.keyAlmacenes[i] === snap.key) {
					this.state.pictures.splice(i , 1);
				}
			}
			console.log("componentDidMount antes"+this.state.keyAlmacenes);
			this.setState({
        pictures: this.state.pictures.concat(snap.val()),
        keyAlmacenes: snap.key

      });
    });
    console.log("componentDidMount despues"+this.state.keyAlmacenes);

  }*/

  EliminarAlmacen(index,e){
    e.preventDefault();
      for(let i = 0; i < this.state.pictures.length;i++){
        console.log(this.state.keyAlmacenes);

       
      }

  }
  /**
   * 
   * this.setState({
      pictures: this.state.pictures.map((picture, i) => {
        if(i!==index){
          alert(picture.key)
        }          
        //return picture = i !== index
      })     
    }); 
   */

  render() {
    return (
      <div className="Content"> 
        <h1>Almacenes o Tiendas</h1>  
        <br/>  
        <div className="BotonCrear">
          <button type="button" className="btn btn-success">Crear</button>  
        </div>
        <br/>
        <table className="table table-bordered" id="tabla">
          <thead>
            <tr>
              <th scope="col">Codigo</th>
              <th scope="col">Logo</th>
              <th scope="col">Nombre</th>
              <th scope="col">Ciudad</th>
              <th scope="col">Direccion</th>
              <th scope="col">Telefono</th>
              <th scope="col"></th>          
            </tr>
          </thead> 
          { 
            this.state.pictures.map((picture,i) => (
                <tbody key={i}>
                  <tr>
                    <th scope="row">{picture.id_almacen}</th>
                    <td><img width="120" src={picture.imagenAlmacen} /></td>
                    <td>{picture.nombre}</td>
                    <td><p>{picture.ciudad}</p></td>
                    <td>{picture.direccion}</td>
                    <td>{picture.telefono}</td> 
                    <td>
                    <a href="" className="badge badge-primary">Editar</a>
                    <br/>
                    <a href="" onClick={this.EliminarAlmacen.bind(this,i)} className="badge badge-danger">Eliminar</a>
                    </td>                                     
                  </tr>
                </tbody>             
            ))//.reverse()
          }  
          </table>      
      </div>
    );
  }
}

export default VerAlmacenes;
