import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { signUp } from '../Requests'

export default function Signup({ onLoggedIn }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  let history = useHistory()

  useEffect(() => {}, [username, password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await signUp(username, password)
      localStorage.setItem('auth-token', response.data.token)
      onLoggedIn(true)
      history.push('/')
    } catch (error) {
      // TODO: ugly errors
      setError(JSON.stringify(error?.response?.data, undefined, 2))
    }
  }

  return (
    <>
      <h1>Sign Up</h1>
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
          <Form.Text className="text-muted">
            Your username will be visible to others.
          </Form.Text>
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
          Sign Up
        </Button>
        {error ? error : ''}
      </Form>
    </>
  )
}
