import { useRef, useState } from 'react'
// import { toast } from 'react-toastify';
import '../styles/authPage.css'
import { imgAvatarPath } from '../../types';
import { useForm } from '../../hooks/useForm';
import { registerUserWithEmailAndPassword } from '../../(services)/firebase/providers';
import { set } from 'firebase/database';

const formNames = {
  login: 'loginForm',
  register: 'registerForm',
}

const formInputNames = {
  displayName: 'displayName',
  email: 'email',
  password: 'password',
  photoUrl: 'photoUrl'
}

const formRegisterInitialState = {
  displayName: '',
  email: '',
  password: '',
  photoUrl: '',
}

const formloginInitialState = {
  email: '',
  password: '',
}

export const AuthPage = () => {
  const [avatarImage, setAvatarImage] = useState({ file: imgAvatarPath, url: '' });

  const {
    formState: formRegisterState,
    handleInputForm: handleRegisterInputForm,
    handleResetForm: handleRegisterResetForm
  } = useForm({ initialState: formRegisterInitialState });

  const {
    formState: formLoginState,
    handleInputForm: handleLoginInputForm,
    handleResetForm: handleLoginResetForm
  } = useForm({ initialState: formloginInitialState });

  const handleUploadAvatarImage = ({ target }) => {
    if ( !target.files[0] ) return;

    setAvatarImage({ 
      file: target.files[0], 
      url: URL.createObjectURL( target.files[0] )
    });
  }

  const handleRegisterSubmit = async ( event ) => {
    event.preventDefault();

    const formData = new FormData( event.target );
    const { displayName, email, password, photoUrl } = Object.fromEntries( formData );

    const result = await registerUserWithEmailAndPassword({
      displayName,
      email,
      password,
      photoUrl
    });

    console.log( result );

    handleResetForm();
  }

  const handleLoginSubmit = ( event ) => {
    event.preventDefault();
    console.log( 'login' );
  }

  return (
    <div className='authPage'>
    
      <div className='authPage__item login'>
        <h2>Welcome back</h2>

        <form name='loginForm' onSubmit={ handleLoginSubmit }q>
          <input 
            name={ formInputNames.displayName } 
            type='text' placeholder='Username' 
            onChange={ handleLoginInputForm } 
            value={ formloginInitialState.displayName } 
          />
          <input 
            name={ formInputNames.password } 
            type='password' 
            placeholder='Password' 
            onChange={ handleLoginInputForm } 
            value={ formloginInitialState.password }
          />
          <button type='submit'>Sign In</button>
        </form>
      </div>

      <div className='separator'></div>

      <div className='authPage__item register'>
        <h2>Register an account</h2>

        <form name='registerForm' onSubmit={ handleRegisterSubmit }>
          <label htmlFor='file'>
            <img src={ avatarImage.url || imgAvatarPath } alt='avatar image' />
            Upload your image
          </label>
          <input 
            name={ formInputNames.photoUrl } 
            type='file' 
            id='file' 
            style={{ display: 'none' }} 
            onChange={ handleUploadAvatarImage } 
          />
          <input 
            name={ formInputNames.displayName } 
            type='text' 
            placeholder='Username'
            onChange={ handleRegisterInputForm }
            value={ formRegisterState.displayName } 
          />
          <input 
            name={ formInputNames.email } 
            type='email' 
            placeholder='example@gmail.com' 
            onChange={ handleRegisterInputForm } 
            value={ formRegisterState.email } 
          />
          <input 
            name={ formInputNames.password } 
            type='password' 
            placeholder='Password' 
            onChange={ handleRegisterInputForm } 
            value={ formRegisterState.password } 
          />
          <button type='submit'>Sign Up</button>
        </form>
      </div>
    
    </div>
  )
}
