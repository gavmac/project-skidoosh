import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { AuthLogin, AuthLogout, Hiro, AuthRegister, Dashboard, Profile } from './client/containers';

export default () => (
<Router>
    <Route exact path="/" render={() => (
        <Redirect to="/register"/>
    )}/>
    <Route path="/login" component={AuthLogin} />
    <Route path="/hiro" component={Hiro} />
    <Route path="/register" component={AuthRegister} />
    <Route path="/logout" component={AuthLogout} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/profile" component={Profile} />

</Router>
);

