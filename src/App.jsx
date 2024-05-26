import { ChatApp } from "./(chat_app)/ChatApp"
import { AuthPage } from "./(auth)/pages/AuthPage"
import { Notification } from "./(notification)/Notification";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "./(services)/firebase";
import { authStore } from "./(zustand)/authStore";
import { Loader } from "./(ui)/components/Loader";

function App() {
  const { user, isLoading, fetchUserData,  } = authStore();

  useEffect( () => {
    const unSub = onAuthStateChanged( FirebaseAuth, ( userActive ) => {
      fetchUserData( userActive?.uid );
    } );

    return () => {
        unSub();
    }
  }, [ fetchUserData ] )

  if ( isLoading ) return <Loader />;

  return (
    <div className="container">
      { 
        ( user ) 
          ? <ChatApp />
          : <AuthPage />  
      }
      
      <Notification />
    </div>
  )
}

export default App
