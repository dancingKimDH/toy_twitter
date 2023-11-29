import { useState, useEffect } from 'react';
import HomePage from 'pages/home';
import Router from 'pages/components/Router';
import { Layout } from 'pages/components/Layout';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { app } from 'firebaseApp';
import { ToastContainer, toast } from "react-toastify";
import Loader from 'pages/components/loader/Loader';


function App() {

  const auth = getAuth(app);
  const [init, setInit] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!auth?.currentUser)
  console.log(auth)

  useEffect(
    () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
        setInit(true);
      })
    }, [auth]
  );

  return (

    <Layout>
      <ToastContainer />
      {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
    </Layout>
  );
}

export default App;
