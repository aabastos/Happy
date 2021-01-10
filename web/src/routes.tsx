import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import NewPassword from './pages/NewPassword';
import DashboardOrphanage from './pages/DashboardOrphanages';
import DashboardPending from './pages/DashboardPending';

function Routes() {
    // function isSignedIn() {
    //     const token = localStorage.getItem("TOKEN");

    //     if (token) {

    //     } else {
    //         return false;
    //     }
    // }

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={OrphanagesMap} />
                <Route path="/orphanages/create" component={CreateOrphanage} />
                <Route path="/orphanages/:id" component={Orphanage} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/new-password" component={NewPassword} />
                <Route path="/dashboard" component={DashboardOrphanage} />
                <Route path="/dashboard-pending" component={DashboardPending} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;