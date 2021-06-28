import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getCurrentUser, getCartItems } from '../Requests'
import CartItem from './CartItem'
import { removeItemFromCart, checkout } from '../Requests'
import { Alert, Button, Modal } from 'react-bootstrap'
import { TiArrowForward } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import { IconContext } from 'react-icons'

export default function Cart() {
  let history = useHistory()
  const [cart, setCart] = useState([])
  const [username, setUsername] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [modalShow, setModalShow] = useState(false)

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
    async function fetchCart() {
      const response = await getCartItems()
      const products = response.data.map((cartItem) => cartItem['product'])
      if (isMounted) {
        setCart(products)
      }
    }

    getUser()
    fetchCart()
    return () => {
      isMounted = false
    }
  }, [])

  const removeItem = async (productId) => {
    try {
      await removeItemFromCart(productId)
      setCart(
        cart.filter((product) => {
          return product.id != productId
        })
      )
    } catch (error) {
      setShowAlert(true)
      setAlertText(error)
    }
  }

  const getCartTotal = () => {
    let total = 0
    for (const cartItem of cart) {
      total += cartItem.price
    }
    return total.toFixed(2)
  }

  const checkoutCart = async () => {
    const productIds = cart.map((product) => product.id)
    await checkout(productIds)
    setModalShow(false)
    history.push('/')
  }

  return (
    <div>
      <div className="mt-3" style={{ display: 'flex', alignItems: 'center' }}>
        <h1>{username}'s Cart</h1>
        {cart.length > 0 && (
          <Button
            className="m-3 float-right"
            size="lg"
            onClick={() => setModalShow(true)}
          >
            <span style={{ marginRight: '10px' }}>Checkout</span>
            <IconContext.Provider value={{ size: '1.5em' }}>
              <TiArrowForward />
            </IconContext.Provider>
          </Button>
        )}
      </div>
      <hr />
      {showAlert && <Alert variant="warning">{alertText}</Alert>}
      <div
        className="inventory-container"
        style={{ display: 'flex', flexWrap: 'wrap' }}
      >
        {cart.length == 0 ? (
          <span>
            Your cart is empty, start <Link to="/">SHOPPING</Link>
          </span>
        ) : (
          cart.map((product) => (
            <CartItem
              key={product.id}
              product={product}
              removeCallback={removeItem}
            />
          ))
        )}
      </div>
      <Modal
        centered
        size="sm"
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Modal.Header>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Purchase your cart items for ${getCartTotal()}?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setModalShow(false)
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              checkoutCart()
            }}
          >
            Purchase
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
