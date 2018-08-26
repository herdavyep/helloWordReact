import React from 'react';
import { render } from 'react-dom';
import firebase from 'firebase';
import {  BrowserRouter as Router } from 'react-router-dom';

import './index.css';
//routes
import AppRoutes from './routes';

//assets
import registerServiceWorker from './registerServiceWorker';
 
firebase.initializeApp({
    apiKey: "AIzaSyAEuxy9oslpOjMxvYUFE-lydvU-saP2P7s",
    authDomain: "crash-b6b47.firebaseapp.com",
    databaseURL: "https://crash-b6b47.firebaseio.com",
    projectId: "crash-b6b47",
    storageBucket: "crash-b6b47.appspot.com",
    messagingSenderId: "696529767840"
});

render(
<Router>
    <AppRoutes/>
</Router>, 
    document.getElementById('root'));
registerServiceWorker();
