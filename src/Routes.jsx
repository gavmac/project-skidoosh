import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { AuthLogin, Hiro } from './containers';

export default () => (
<Router>
    <Route path="/login" component={AuthLogin} />
    <Route path="/hiro" component={Hiro} />
</Router>
);

