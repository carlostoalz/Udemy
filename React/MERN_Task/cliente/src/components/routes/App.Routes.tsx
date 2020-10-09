import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from '../auth/Login';
import NuevaCuenta from '../auth/NuevaCuenta';
import Proyectos from '../proyectos/Proyectos';
import RutaPrivada from './RutaPrivada';

const AppRoutes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <RutaPrivada exact path="/proyectos" component={Proyectos} />
            </Switch>
        </Router>
    );
};

export default AppRoutes;