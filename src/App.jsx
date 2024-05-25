import { ChatApp } from "./(chat_app)/ChatApp"
import { AuthPage } from "./(auth)/pages/AuthPage"
import { Notification } from "./(notification)/Notification";

function App() {
  const authentication = true;

  return (
    <div className="container">
      { 
        ( authentication ) 
          ? <AuthPage />  
          : <ChatApp />
      }
      
      <Notification />
    </div>
  )
}

export default App
