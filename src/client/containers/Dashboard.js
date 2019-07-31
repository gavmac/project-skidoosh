import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import client from "../apollo";

const uploadFileMutation = gql `
    mutation($file: Upload!) {
        uploadFile(file: $file) {
      filename
      }
    }
`;
//
// const dashBoard = () => {
//     return (
//         <Mutation mutation={uploadFileMutation}>
//             {mutate => (
//                 <Dropzone onDrop={([file]) => mutate({variables: { file }})}>
//                     {({getRootProps, getInputProps}) => (
//                         <section>
//                             <div {...getRootProps()}>
//                                 <input {...getInputProps()} />
//                                 <p>Drop it in drop it in, drop it in drop it in.... oh oh oooooh</p>
//                             </div>
//                         </section>
//                     )}
//
//                 </Dropzone>
//             )}
//         </Mutation>
//     )
// };



const dashBoard = () => {

        const handleChangeStatus = ({ meta, file }, status) => {
            console.log(status, meta, file)
        }

        const handleSubmit = async (files) => {
            console.log('yo')
            console.log(files[0].file);
            try {
                await client.mutate({
                    variables: files[0],
                    mutation: uploadFileMutation,
                });
            } catch (errors) {
                return errors.message
            }
        }

        return (
            <Dropzone
                onChangeStatus={handleChangeStatus}
                onSubmit={handleSubmit}
                maxFiles={1}
                inputContent="Drop 1 File"
            />
        )
    };



export default dashBoard;