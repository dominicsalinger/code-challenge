import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getCurrentUser } from '../Requests'
import AddProduct from './AddProduct'
import Inventory from './Inventory'

export default function Shopfront() {
  const [username, setUsername] = useState('')
  const [existingProducts, setExistingProducts] = useState([])
  let history = useHistory()

  useEffect(() => {
    let isMounted = true
    async function getUser() {
      try {
        const response = await getCurrentUser()
        if (isMounted) {
          setUsername(response.data.username)
        }
      } catch (error) {
        if (error.response.status === 401) {
          history.push('/login')
        }
      }
    }

    getUser()
    return () => {
      isMounted = false
    }
  }, [])

  const newProductAdded = (id, name, description, price, quantity) => {
    setExistingProducts([
      ...existingProducts,
      { id, name, description, price, quantity },
    ])
  }

  return (
    <div>
      <h1 className="mt-3">{`${username}'s shopfront`}</h1>
      <hr />
      <AddProduct addProductCallback={newProductAdded} />
      <hr />
      <Inventory existingProducts={existingProducts} />
    </div>
  )
}
