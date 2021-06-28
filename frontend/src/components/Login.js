import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { getToken } from '../Requests'

export default function Login({ onLoggedIn }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  let history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await getToken(username, password)
      localStorage.setItem('auth-token', response.data.token)
      onLoggedIn(true)
      history.push('/')
    } catch (error) {
      setError(error?.response?.data?.non_field_errors?.[0])
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
        {error ? error : ''}
      </Form>
      <span>
        No account? <Link to="/signup">Sign Up</Link>
      </span>
    </div>
  )
}
