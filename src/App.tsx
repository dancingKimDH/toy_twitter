import { useState } from 'react';
import HomePage from 'pages/home';
import Router from 'pages/components/Router';
import { Layout } from 'pages/components/Layout';
import { getAuth } from 'firebase/auth'
import { app } from 'firebaseApp';


function App() {

  const auth = getAuth(app);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!auth?.currentUser)
  console.log(auth)

  return (
    <Layout>
      <Router />
    </Layout>
  );
}

export default App;
