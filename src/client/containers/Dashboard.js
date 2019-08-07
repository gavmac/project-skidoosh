import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import patternMarker from '../../pattern-marker.png'


import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import client from "../apollo";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    image: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        width: '100%'
    }
}));

const uploadFileMutation = gql `
    mutation($file: Upload!) {
        uploadFile(file: $file) {
      filename
      }
    }
`;

const GET_USER = gql `
query {
    currentUser {
        name
    }
  }
`;


const DashBoard = () => {

    const classes = useStyles();

        const handleChangeStatus = ({ meta, file }, status) => {
            console.log(status, meta, file)
        }

        const handleSubmit = async (files) => {
            console.log('yo');
            console.log(files[0].file);
            try {
                await client.mutate({
                    variables: files[0],
                    mutation: uploadFileMutation,
                });
            } catch (errors) {
                return errors.message
            }
        };

        return (

            <Query query={GET_USER}>
                {({ loading, data }) => !loading && (
                    <Container component="main" maxWidth="sm">
                        <div className={classes.paper} >
                            <Typography component="h5" variant="h5">
                                Hello {data.currentUser.name}.<br />
                                Below are some instructions that you can follow
                            </Typography>
                            <Typography component="h4" variant="p">
                                <br /><br />
                                Scan the QR code with your phone, give the heroku server a moment to
                                fire up and hold camera over the image.
                                <br /><br />
                                Supported in the latest Safari on IOS and Chrome on Andriod.
                                <br /><br />
                                To improve readability adjust the brightness of your screen.
                            </Typography>
                            <img src={patternMarker} className={classes.image} />

                            <Typography component="h4" variant="p">
                                I'm also working on allowing people to create there own augmented reality experience.
                                There is some support for this if you are working locally, but for now my friends thats all thats on offer.
                                <br /><br />
                            </Typography>
                            <Dropzone
                                onChangeStatus={handleChangeStatus}
                                onSubmit={handleSubmit}
                                maxFiles={1}
                                inputContent="Drop 1 File"
                            />
                        </div>
                    </Container>

                )}
            </Query>
        )
    };



export default DashBoard;