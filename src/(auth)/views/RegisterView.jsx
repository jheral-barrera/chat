import { useState } from "react";
import { toast } from "react-toastify";

import { useForm } from "../../hooks/useForm";
import { userPhotoPath } from "../../types/";
import { startRegisterUser } from "../../helpers";

const formInputNames = {
    displayName: 'displayName',
    email: 'email',
    password: 'password',
    photoUrl: 'photoUrl'
}
  
  const formInitialState = {
    displayName: '',
    email: '',
    password: '',
    photoURL: '',
}

export const RegisterView = () => {
    const [ isLoading, setIsLoading ] = useState( false );
    const [ userPhoto, setUserPhoto] = useState({ file: null, url: '' });

    const { displayName, email, password, formState, handleInputForm, handleResetForm } = useForm({ initialState: formInitialState });

    const onUploadUserPhoto = ({ target }) => {
        if ( !target.files[0] ) return;

        setUserPhoto({ 
            file: target.files[0], 
            url: URL.createObjectURL( target.files[0] )
        });
    }
    
    const onSubmit = async ( event ) => {
        event.preventDefault();
        setIsLoading( true );

        const result = await startRegisterUser({
            displayName,
            email,
            password,
            userPhoto
        });

        if ( !result.ok ) return toast.error( 'Something went wrong :C' );

        toast.success( 'Account created successfully' );
    
        handleResetForm();

        setIsLoading( false );
      }


    return (
        <div className='authPage__item register'>
            <h2>Register an account</h2>

            <form onSubmit={ onSubmit }>
                <label htmlFor='file'>
                    <img src={ userPhoto.url || userPhotoPath } alt='avatar image' />
                    Upload your image
                </label>
                <input 
                    name={ formInputNames.photoUrl } 
                    type='file' 
                    id='file' 
                    style={{ display: 'none' }} 
                    onChange={ onUploadUserPhoto }
                    
                />
                <input 
                    name={ formInputNames.displayName } 
                    type='text' 
                    placeholder='Username'
                    onChange={ handleInputForm }
                    value={ displayName } 
                />
                <input 
                    name={ formInputNames.email } 
                    type='email' 
                    placeholder='example@gmail.com' 
                    onChange={ handleInputForm } 
                    value={ email } 
                />
                <input 
                    name={ formInputNames.password } 
                    type='password' 
                    placeholder='Password' 
                    onChange={ handleInputForm } 
                    value={ password } 
                />

                <button type='submit' disabled={ isLoading }>
                    { isLoading ? 'Loading' : 'Sign Up' }
                </button>
            </form>
        </div>
    )
}
