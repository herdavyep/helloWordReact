import React, { Component } from 'react';
import firebase from 'firebase';
import './css/FormCrearAlmacen.css';


class FormCrearAlmacen extends Component {
  constructor () {
    super();
    this.state = {
      img_imagen:'',
      fileNombre:'',
      file:'',
      ciudad : '',
      direccion: '',
      id_almacen: '',
      imagenAlmacen: '',
      nombre: '',
      telefono: '',
    };
    this.handleDatabase = this.handleDatabase.bind(this);
    this.actualizarCiudad = this.actualizarCiudad.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.actualizarArchivo = this.actualizarArchivo.bind(this);
    this.actualizarDireccion = this.actualizarDireccion.bind(this);
    this.actualizarIdAlmacen = this.actualizarIdAlmacen.bind(this);
    this.actualizarNombre = this.actualizarNombre.bind(this);
    this.actualizarTelefono = this.actualizarTelefono.bind(this);

    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  actualizarCiudad(e) {
    this.setState({
      ciudad: e.target.value,

    });
  }
  actualizarArchivo(e) {
    this.setState({
      file: e.target.files[0],
      fileNombre:e.target.value
    });
  }
  actualizarDireccion(e) {
    this.setState({
      direccion: e.target.value,

    });
  }
  actualizarIdAlmacen(e) {
    this.setState({
      id_almacen: e.target.value,

    });
  }
  actualizarNombre(e) {
    this.setState({
      nombre: e.target.value,

    });
  }
  actualizarTelefono(e) {
    this.setState({
      telefono: e.target.value,

    });
  }

  handleUpload(event){
    event.preventDefault();
    const file = event.target.files[0]
    const storageRef = firebase.storage().ref(`/almacenes/${file.name}`);
    const task = storageRef.put(file);

    task.on('state_changed', snapshot => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({
            uploadValue: percentage
        })
    }, error => {
        console.log(error.message)
    }, () => {

      storageRef.getDownloadURL().then(url => {

        this.setState({
          imagenAlmacen:url
        })
        
      });
    });
}

handleDatabase(event){
  event.preventDefault();

  const record = { 
    ciudad : this.state.ciudad,
    direccion: this.state.direccion,
    id_almacen: this.state.id_almacen,
    imagenAlmacen: this.state.imagenAlmacen,
    nombre: this.state.nombre,
    telefono: this.state.telefono,

} 

const dbRef = firebase.database().ref('almacen/almacenes');
const newPicture = dbRef.push();
newPicture.set(record);

this.setState({
  fileNombre:'',
  file:'',
  ciudad : '',
  direccion: '',
  id_almacen: '',
  imagenAlmacen: '',
  nombre: '',
  telefono: ''

});

}

  render() {
    return (
      <div className="card ">
      <h1>Crear Almacen </h1>
        <form  onSubmit={this.handleDatabase} className="card-body" >
        <label htmlFor="">Nombre </label>
        <div className="form-group">
            <input
              type="text"
              name="nombre"
              className="form-control"
              value={this.state.nombre}
              onChange={this.actualizarNombre}
              autoComplete="nombre"
              />
          </div>
          <div className="form-group">
          <label htmlFor="" >Ciudad </label>
            <input
              type="text"
              name="ciudad"
              className="form-control"
              value={this.state.ciudad}
              onChange={this.actualizarCiudad}
              placeholder="Ciudad"
              autoComplete="ciudad"
              />
          </div>
          <div className="form-group">
          <label htmlFor="" className="Elabel">Direccion </label>
            <input
              type="text"
              name="direccion"
              className="form-control"
              value={this.state.direccion}
              onChange={this.actualizarDireccion}
              placeholder="Direccion"
              autoComplete="direccion"
              />
          </div>
          <div className="form-group">
          <label htmlFor="" className="Elabel">Telefono </label>
          <input
              type="text"
              name="telefono"
              className="form-control"
              value={this.state.telefono}
              onChange={this.actualizarTelefono}
              placeholder="Telefono"
              autoComplete="telefono"
              />
          </div>
          <div className="form-group">
          <label htmlFor="" className="Elabel">Codigo Almacen </label>
          <input
              type="text"
              name="id_almacen"
              className="form-control"
              value={this.state.id_almacen}
              onChange={this.actualizarIdAlmacen}
              placeholder="Codigo del Almacen"
              autoComplete="postal-code"
              />
          </div>
          <div className="form-group">
          <label htmlFor="" className="Elabel">Imagen </label><br/>
          <input
              type="file" 
              name="imagenAlmacen"
              className="form-control"
              onChange={this.handleUpload}
              value={this.state.fileNombre}
              placeholder="Imagen Almacen"
              />
          </div>
          <img  width="120" src={this.state.imagenAlmacen} alt=""/>
          <button onClick={this.handleDatabase} className="btn btn-primary" >
            Crear Almacen
          </button>
        </form>
      </div>
    )
  }

}

export default FormCrearAlmacen;
