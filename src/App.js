import { useState, useEffect } from 'react'
import Navbar from "./components/UI/Navbar";
import Card from "./components/UI/Card";
import Form from "./components/Form/Form";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  //Below useEffect hook will run only once
  useEffect(() => {
    const storedUserLoginInfo = localStorage.getItem('isLoggedIn')
    if(storedUserLoginInfo === '1'){
      setIsLoggedIn(true)
    }
  }, [])

  const loginHandler = (email, password) => {
    // event.preventDefault()
    localStorage.setItem('isLoggedIn', '1')
    setIsLoggedIn(true)
  }

  const logoutHandler = () => {
    localStorage.setItem('isLoggedIn', '0')
    setIsLoggedIn(false)
  }

  return (
    <div>
      <Navbar loginStatus={isLoggedIn} onLogout={logoutHandler} />
      <Card>
        <Form onLogin={loginHandler} loginStatus={isLoggedIn} />
      </Card>
    </div>
  );
}

export default App;
