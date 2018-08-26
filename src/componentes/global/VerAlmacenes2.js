import React, { Component } from 'react';
import firebase from 'firebase';

import './css/VerAlmacenes.css';

class VerAlmacenes2 extends Component {

  constructor(){
    super();
    this.state = {
      pictures: [],
      idArray:''

    };
    
  }

  componentWillMount(){

    firebase.database().ref('almacen/almacenes').on('child_added', snap => {

      const { pictures } = this.state;
			pictures.push({
				keyID: snap.key,
        nombre: snap.val().nombre,
        ciudad: snap.val().ciudad,
				direccion: snap.val().direccion,
				telefono: snap.val().telefono,
				id_almacen: snap.val().id_almacen,
				imagenAlmacen: snap.val().imagenAlmacen

			});

			this.setState({pictures});
		});
  }

  componentDidMount(){
    const { pictures } = this.state;

    firebase.database().ref('almacen/almacenes').on('child_removed', snap => {
			for(let i = 0; i < pictures.length; i++) {
				if(pictures[i].keyID === snap.key) {
					pictures.splice(i , 1);
				}
			}
			this.setState({ pictures });
    });

    firebase.database().ref('almacen/almacenes').on('child_changed', snap => {

      const { pictures } = this.state;
      console.log(pictures.length)
      console.log(pictures)
			pictures.push({
				keyID: snap.key,
        nombre: snap.val().nombre,
        ciudad: snap.val().ciudad,
				direccion: snap.val().direccion,
				telefono: snap.val().telefono,
				id_almacen: snap.val().id_almacen,
				imagenAlmacen: snap.val().imagenAlmacen

      });
      pictures.splice(this.state.idArray,1);

      this.setState({pictures});
      console.log(pictures.length)
      console.log(pictures)

		});
  }

  EliminarAlmacen(id,e){
    e.preventDefault();
    var r = window.confirm("Esta seguro?");
    if (r === true) {
        const dbRef = firebase.database().ref('almacen/almacenes');
        dbRef.child(id).remove();
    } else {

    }    
  }

  EditarAlmacen(id,i,e){
    console.log("soy "+i)
    this.setState({
      idArray:i
    })
    e.preventDefault();
    this.props.editar(id);
    
  }
 
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
                    <td><img width="120" src={picture.imagenAlmacen} alt="imagen"/></td>
                    <td>{picture.nombre}</td>
                    <td><p>{picture.ciudad}</p></td>
                    <td>{picture.direccion}</td>
                    <td>{picture.telefono}</td> 
                    <td>
                    <a href="" onClick={this.EditarAlmacen.bind(this,picture.keyID,i)} className="badge badge-primary">Editar</a>
                    <br/>
                    <a href="" onClick={this.EliminarAlmacen.bind(this,picture.keyID)} className="badge badge-danger">Eliminar</a>
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

export default VerAlmacenes2;
