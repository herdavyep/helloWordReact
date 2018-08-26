import React from 'react';
import { Route, Switch } from 'react-router-dom';


import App from './componentes/App';
import Compra from './componentes/Compra/index';
import Promedios from './componentes/Promedios/index';
import Home from './componentes/Home';
import Page404 from './componentes/Page404/index';

const AppRoutes = () =>
    <App>
        <Switch>
        <Route exact path="/Compra" component={Compra}/>
        <Route exact path="/Promedios" component={Promedios}/>
        <Route exact path="/" component={Home}/>
        <Route component={Page404}/>            
        </Switch>
    </App>
    export default AppRoutes;