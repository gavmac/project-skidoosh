import React, { useEffect, useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


function AuthLogin () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const style = {
        margin: 15,
    };



    return (
        <div>
            <Container fixed>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            onChange = {(event,newValue) => setUsername(newValue)}
                            autoComplete="current-password"
                        />
                    </Grid>
                    <br/>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange = {(event,newValue) => setPassword(newValue)}
                        />
                    </Grid>
                    <br/>
                    <Button label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}>Submit</Button>
                </Grid>
            </Container>
        </div>
    );
}

export default AuthLogin;
