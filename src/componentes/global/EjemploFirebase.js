import React, { Component } from 'react';
import firebase from 'firebase';
import SubirImagenes from './SubirImagenes';

//import './css/Content.css';

class EjemploFirebase extends Component {

  constructor(){
    super();
    this.state = {
      user: null,
      pictures: [],
      urlImagen: null

    };
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleUpload = this.handleUpload.bind(this);


  }

  componentWillMount(){

    firebase.auth().onAuthStateChanged(user => {
      this.setState({ 
        user: user 
      });
    })
    firebase.database().ref('almacen/almacenes').on('child_added', snapshot => {
      this.setState({
        pictures: this.state.pictures.concat(snapshot.val())
      });
    });
  }

  handleAuth(){
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(result => console.log(`${result.user.email } ha iniciado sesion`))
    .catch(error => console.log(`Error ${error.code}: ${error.message}`));

  }

  handleLogout(){
    firebase.auth().signOut()
    .then(result => console.log(`${result.user.email} ha cerrado sesion`))
    .catch(error => console.log(`Error ${error.code}: ${error.message}`));

  }

  handleUpload(event){
    const file = event.target.files[0];
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
        
          const record = {
            imagenAlmacen: url,
            ciudad: "Cairo",
            nombre: "la 14",
            telefono: "23456",
            direccion:"calle busquela Cra encuentrela"
          }  
     
        const dbRef = firebase.database().ref('almacen/almacenes');
        const newPicture = dbRef.push();
        newPicture.set(record);
      });
    });
}

  renderLoginButton(){

    if(this.state.user){
      return (
        <div >
          <p >Hola {this.state.user.displayName}!</p>
          <img width="100" src={this.state.user.photoURL} alt={this.state.user.displayName} />
          <button onClick={this.handleLogout} >Salir</button>
          <SubirImagenes  onUpload={ this.handleUpload } />

          {
            this.state.pictures.map((picture,i) => (
              <div key={i}>
                <img width="320" src={picture.imagenAlmacen} />
                <p> {picture.ciudad}</p>
              </div>
            )).reverse()
          }
        </div>
      );
    }else{
      return(
      <button onClick={this.handleAuth} >Login con Google</button>
      );
    }
  }

  render() {
    return (
      <div className="Content">
        { this.renderLoginButton()}
      </div>
    );
  }
}

export default EjemploFirebase;
