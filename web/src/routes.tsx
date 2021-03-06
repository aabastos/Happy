import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import EditOrphanage from './pages/EditOrphanage';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import NewPassword from './pages/NewPassword';
import DashboardOrphanage from './pages/DashboardOrphanages';
import DeleteOrphanage from './pages/DeleteOrphanages';
import Success from './pages/Success';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={OrphanagesMap} />
                <Route path="/orphanages/create" component={EditOrphanage} />
                <Route path="/orphanages/:id" component={Orphanage} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/new-password" component={NewPassword} />
                <Route path="/dashboard" component={DashboardOrphanage} />
                <Route path="/dashboard-pending" component={DashboardOrphanage} />
                <Route path="/dashboard-approve-orphanage/:id" component={EditOrphanage} />
                <Route path="/dashboard-edit-orphanage/:id" component={EditOrphanage} />
                <Route path="/dashboard-delete-orphanage/:id" component={DeleteOrphanage} />
                <Route path="/create-success" component={Success} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;