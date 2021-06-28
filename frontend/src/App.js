import React, { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Nav from './components/ShopfrontNav'
import Cart from './components/Cart'
import Shopfront from './components/Shopfront'
import Products from './components/Products'
import Signup from './components/Signup'
import Login from './components/Login'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    setLoggedIn(localStorage.getItem('auth-token') ? true : false)
  }, [])

  const handleLogin = (loggedIn) => {
    setLoggedIn(loggedIn)
  }

  return (
    <Router>
      <div className="App">
        <Nav />
        <Container>
          <Switch>
            <Route exact path="/" component={() => <Products />} />
            <Route
              path="/signup"
              component={() => <Signup onLoggedIn={handleLogin} />}
            />
            <Route
              path="/login"
              component={() => <Login onLoggedIn={handleLogin} />}
            />
            <Route path="/shopfront" component={() => <Shopfront />} />
            <Route path="/cart" component={() => <Cart />} />
          </Switch>
        </Container>
      </div>
    </Router>
  )
}

export default App
