import React, {useState} from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Content from './components/Content';
import { BrowserRouter as Router } from "react-router-dom";

const UserContext = React.createContext(null)

function App() {

  const [user, setUser] = useState(null);

  const userContextState = {
      user,
      login: (user) => setUser(user),
      logout: () => setUser(null),
      loggedIn: () => !!user
  }

  return (
    <UserContext.Provider value={userContextState}>
      <Router>
        <Header/>
        <Content/>
        <Footer/>
      </Router>
    </UserContext.Provider>
  )
}

export default App;
export {UserContext}