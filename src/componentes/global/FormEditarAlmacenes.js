import React, { Component } from 'react';
import firebase from 'firebase';
import './css/FormCrearAlmacen.css';
import VerAlmacenes2 from './VerAlmacenes2';


class FormEditarAlmacen extends Component {
  constructor () {
    super();
    this.state = {
      pictures: [],  
      img_imagen:'',
      fileNombre:'',
      file:'',
      ciudad : '',
      direccion: '',
      id_almacen: '',
      imagenAlmacen: '',
      nombre: '',
      telefono: '',
      id:''
    };
    this.handleDatabase = this.handleDatabase.bind(this);
    this.actualizarCiudad = this.actualizarCiudad.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.actualizarArchivo = this.actualizarArchivo.bind(this);
    this.actualizarDireccion = this.actualizarDireccion.bind(this);
    this.actualizarIdAlmacen = this.actualizarIdAlmacen.bind(this);
    this.actualizarNombre = this.actualizarNombre.bind(this);
    this.actualizarTelefono = this.actualizarTelefono.bind(this);

    this.hola = this.hola.bind(this);
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
dbRef.child(this.state.id).update(record);
/*dbRef = firebase.database().ref('almacen/almacenes');
        dbRef.child(id).remove();*/

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

hola(id){
    console.log(id)
    const { pictures } = this.state;
    for(let i = 0; i < pictures.length; i++) {
        if(pictures[i].keyID === id) {
            this.setState({
                nombre:pictures[i].nombre,
                ciudad:pictures[i].ciudad,
                direccion:pictures[i].direccion,
                id_almacen:pictures[i].id_almacen,
                telefono:pictures[i].telefono,
                imagenAlmacen:pictures[i].imagenAlmacen,
                id:pictures[i].keyID
            })
            //console.log(pictures[i].nombre)
        }
    }
}

  render() {
    return (
      <div>
        <VerAlmacenes2 editar={this.hola}/> 
          <div className="card ">
            <h1>Editar Almacen </h1>
                <form  onSubmit={this.handleDatabase} className="card-body" >
                <div className="form-group">
                    <input
                    type="text"
                    name="nombre"
                    className="form-control"
                    value={this.state.nombre}
                    onChange={this.actualizarNombre}
                    placeholder="Nombre"
                    autoComplete="nombre"
                    />
                </div>
                <div className="form-group">
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
                <input
                    type="text"
                    name="id_almacen"
                    className="form-control"
                    value={this.state.id_almacen}
                    onChange={this.actualizarIdAlmacen}
                    placeholder="Codigo del Almacen"
                    autoComplete="id_almacen"
                    />
                </div>
                <div className="form-group">
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
                    Editar Almacen
                </button>
                </form>
            </div>
      </div>
    )
  }

}

export default FormEditarAlmacen;
