import React from 'react';
import client from '../apollo';
import { Redirect } from "react-router-dom";

const AuthLogout = () => {
    localStorage.removeItem('token');
    client.resetStore();
    return <Redirect to="/"/>
};

export default AuthLogout;