import React from 'react';
import gql from 'graphql-tag';
import client from '../apollo';
import { Formik } from 'formik';
import * as Yup from 'yup'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const UserSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Must be longer than 2 characters')
        .max(20, 'Nice try, nobody has a first name that long')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Required Email'),
    password: Yup.string()
        .required('Required Password'),
});

const SUBMIT_SIGNUP = gql`
  mutation signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      jwt
    }
  }
`;


const AuthRegister = () => {

    const classes = useStyles();

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            await client.mutate({
                    variables: values,
                    mutation: SUBMIT_SIGNUP,
                }).then(data => {
                localStorage.setItem('token', data.data.signup.jwt);
            }) ;
            window.location.href = "/dashboard";
        } catch (e) {
            const errors = e.graphQLErrors.map(e => e.message)
            setSubmitting(false);
            setErrors({ email: ' ', password: ' ', form: errors })}
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>

                <Formik
                    onSubmit={handleSubmit}
                    validationSchema={UserSchema}
                >
                    {({ values, handleChange, handleSubmit, errors, touched, isSubmitting }) => (
                        <form className={classes.form} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        error={errors.name}
                                        autoComplete="fname"
                                        name="name"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        onChange={handleChange}
                                    />
                                    {errors.name && touched.name ?
                                        (<div>{errors.name}</div>) :
                                        null}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={errors.email}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={handleChange}
                                    />
                                    {errors.email && touched.email ?
                                        (<div>{errors.form}</div>) :
                                        null}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
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
                                </Grid>
                            </Grid>
                            <Button
                                onClick={handleSubmit}
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign Up
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        Already have an account? Sign in
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



export default AuthRegister;