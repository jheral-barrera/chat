import { set } from "firebase/database";
import { useForm } from "../../hooks/useForm";
import { startLoginUser } from "../../helpers/startLoginUser";
import { useState } from "react";
import { toast } from "react-toastify";

const formInputNames = {
    email: 'email',
    password: 'password',
}
  
  const formInitialState = {
    email: '',
    password: '',
}

export const LoginView = () => {
    const [ isLoading, setIsLoading ] = useState( false );
    const { email, password, formState, handleInputForm, handleResetForm } = useForm({ initialState: formInitialState });

    const onSubmit = async ( event ) => {
        event.preventDefault();
        setIsLoading( true );

        const result = await startLoginUser({ email, password });

        if ( !result.ok ) return toast.error( 'Something went wrong :C' );

        toast.success( 'Account logged in successfully' );
    
        handleResetForm();
        setIsLoading( false );
    }

  return (
    <div className='authPage__item login'>
        <h2>Welcome back</h2>

        <form onSubmit={ onSubmit }>
            <input 
                name={ formInputNames.email } 
                type='email' placeholder='example@example.com' 
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

            <button type='submit'>Sign In</button>
        </form>
    </div>
  )
}
