import { useState } from 'react';
import { useForm } from '../../../hooks/useForm';
import { userPhotoPath } from '../../../types'
import '../styles/addUser.css'
import { startSearchUser } from '../../../helpers/startSearchUser';
import { set } from 'firebase/database';

export const AddUser = () => {
  const { userName, formState, handleInputForm, handleResetForm } = useForm( { initialState: { userName: '' } } );

  const [ user, setUser ] = useState( null );

  const onSubmitSearch = async ( event ) => {
    event.preventDefault();

    const userSearched = await startSearchUser( { userName } );
    setUser( userSearched );

    handleResetForm();
  }

  return (
    <div className='addUser'>
      <form onSubmit={ onSubmitSearch }>
        <input 
          type="text" 
          name='userName' 
          placeholder="User to search" 
          onChange={ handleInputForm }
          value={ userName }
        />
        <button type='submit'>Search</button>
      </form>

      { 
        user && (
          <div className="addUser__user">
            <div className="addUser__user__detail">
              <img src={ user?.photoURL } alt="" />
              <span>{ user?.displayName }</span>
            </div>
    
            <button>Add User</button>
          </div>
        ) 
        
      }
    </div>
  )
}
