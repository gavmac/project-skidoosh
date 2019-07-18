import React, { Component } from 'react';
import Routes from './Routes';
import Header from './client/components/Header';
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends Component {
    render() {
        return (
            <div>
                <CssBaseline />
                <Header />
                <Routes />
            </div>
        );
    }
}

export default App;
