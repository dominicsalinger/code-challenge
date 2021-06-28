import React, { useState, useEffect } from 'react'
import { Alert, Form } from 'react-bootstrap'
import {
  addProductToCart,
  getCartItems,
  searchProducts,
  getProducts,
} from '../Requests'
import ProductCard from './ProductCard'

/**
 * Parent component for the products/shopping page.
 * This is responsible for grabbing initial products from the api and searching for specific items.
 */
export default function Products() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [fallbackProducts, setFallbackProducts] = useState([])
  const [search, setSearch] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  // when the page loads, fetch products and the user's cart
  useEffect(() => {
    let isMounted = true

    async function fetchProducts() {
      const response = await getProducts()
      if (isMounted) {
        setProducts(response.data)
        setFallbackProducts(response.data)
      }
    }

    async function fetchCart() {
      const response = await getCartItems()
      if (isMounted) {
        const productIds = response.data.map(
          (cartItem) => cartItem['product_id']
        )
        setCart(productIds)
      }
    }

    fetchProducts()
    fetchCart()

    return () => {
      isMounted = false
    }
  }, [])

  // when the search input changes, fetch new product results
  useEffect(() => {
    async function fetchSearchResults() {
      const response = await searchProducts(search)
      setProducts(response.data)
    }
    if (search) {
      fetchSearchResults()
    } else {
      setProducts(fallbackProducts)
    }
  }, [search])

  const handleAddProduct = async (productId) => {
    try {
      await addProductToCart(productId)
      setCart([...cart, productId])
    } catch (error) {
      if (error.response.status === 401) {
        setShowAlert(true)
      }
    }
  }

  return (
    <div>
      <Form.Group className="mt-3">
        <Form.Control
          size="lg"
          type="text"
          placeholder="Search products"
          onChange={(e) => {
            setSearch(e.target.value)
          }}
        />
      </Form.Group>

      {showAlert ? (
        <Alert variant="warning" className="mt-3 mb-0">
          Please <Alert.Link href="/login">LOGIN</Alert.Link> to add items to
          your cart
        </Alert>
      ) : (
        ''
      )}

      <div
        className="product-container"
        style={{ display: 'flex', flexWrap: 'wrap' }}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            cart={cart}
            product={product}
            handleAddProduct={handleAddProduct}
          />
        ))}
      </div>
    </div>
  )
}
