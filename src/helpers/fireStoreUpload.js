import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FirebaseStorage } from "../(services)/firebase";

export const fireStoreUpload = async ( file ) => {
    const date = new Date().getMilliseconds();
    const storageRef = ref( FirebaseStorage, `images/${ date + file.name }` );

    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise( ( resolve, reject ) => {

        uploadTask.on( 'state_changed', 
        ( snapshot ) => { // manejo de subida
            const progress = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
            console.log( `Upload is ${ progress }% done`);
    
            switch ( snapshot.state ) {
                case 'paused':
                    console.log( 'Upload is paused' );
                    break;
                case 'running':
                    console.log( 'Upload is running' );
                    break;
            }
        }, 
        ( error ) => { // manejo de subida fallida
            reject( `Error uploading file: ${ error.message }` );
        }, 
        () => { // manejo de subida exitosa
            getDownloadURL( uploadTask.snapshot.ref )
                .then( ( downloadURL ) => resolve( downloadURL ) )
        } );

    } )
}
