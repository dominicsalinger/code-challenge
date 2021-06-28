import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getCurrentUser } from '../Requests'
import AddProduct from './AddProduct'
import Inventory from './Inventory'

/**
 * Parent view for user's shop. This renders the AddProduct and Inventory components.
 * The AddProduct and Inventory sibling components communicate through this component:
 *  - AddProduct is passed a callback that updates existingProducts
 *  - existingProducts is passed as a prop to Inventory
 * This allows for the Inventory to be updated with the new item without another api call grabbing all their inventory
 */
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
