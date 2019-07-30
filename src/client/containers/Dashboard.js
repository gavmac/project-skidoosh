import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';


import Dropzone from 'react-dropzone'

const uploadFileMutation = gql `
    mutation($file: Upload!) {
        uploadFile(file: $file) {
      filename
      }
    }
`;

const dashBoard = () => {
    return (
        <Mutation mutation={uploadFileMutation}>
            {mutate => (
                <Dropzone onDrop={([file]) => mutate({variables: { file}})}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>Drop it in drop it in, drop it in drop it in.... oh oh oooooh</p>
                            </div>
                        </section>
                    )}

                </Dropzone>
            )}
        </Mutation>
    )
};

export default dashBoard;