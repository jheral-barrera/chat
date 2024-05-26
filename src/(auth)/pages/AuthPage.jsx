import '../styles/authPage.css'
import { LoginView, RegisterView } from '../views';


export const AuthPage = () => {

  return (
    <div className='authPage'>

      <LoginView />      

      <div className='separator'></div>

      <RegisterView />
    
    </div>
  )
}
