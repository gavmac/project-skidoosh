import React from 'react';
import gql from 'graphql-tag';
import client from '../apollo';
import { Formik } from 'formik';
import * as Yup from 'yup'


import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const UserSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Required Email'),
    password: Yup.string()
        .required('Required Password'),
});


const SUBMIT_LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password){ jwt }
  }
`;

const AuthLogin = () => {
    const classes = useStyles();

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            await client.mutate({
                variables: values,
                mutation: SUBMIT_LOGIN,
            }).then(data => {
                localStorage.setItem('token', data.data.login.jwt);
            });
            window.location.href = "/dashboard";
        } catch (e) {
            const errors = e.graphQLErrors.map(e => e.message)
            setSubmitting(false);
            setErrors({email: 'Incorrect email or password', password: 'Incorrect email or password', form: errors})
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>

                <Formik
                    onSubmit={handleSubmit}
                    validationSchema={UserSchema}
                >
                    {({values, handleChange, handleSubmit, errors, touched, isSubmitting}) => (
                        <form className={classes.form}>
                            <TextField
                                error={errors.email}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={handleChange}
                                autoFocus
                            />
                            {errors.email && touched.email ?
                                (<div>{errors.email}</div>) :
                                null}
                            <TextField
                                error={errors.password}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                            />
                            {errors.password && touched.password ?
                                (<div>{errors.password}</div>) :
                                null}
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary"/>}
                                label="Remember me"
                            />
                            <Button
                                onClick={handleSubmit}
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </div>
        </Container>
    );
}

export default AuthLogin;
