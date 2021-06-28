import React, { useState } from 'react'
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap'
import { createProduct } from '../Requests'

export default function AddProduct({ addProductCallback }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0.0)
  const [quantity, setQuantity] = useState(0)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await createProduct(name, description, price, quantity)
      addProductCallback(response.data.id, name, description, price, quantity)
      setError('')
    } catch (error) {
      setError(JSON.stringify(error?.response?.data, undefined, 2))
    }
  }

  return (
    <div>
      <h4>Add a Product</h4>
      <Form onSubmit={handleSubmit}>
        <Row className="mt-3">
          <Form.Group className="mt-2" as={Col} style={{ minWidth: '20rem' }}>
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Millenium Falcon"
              name={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} className="mt-2" style={{ minWidth: '10rem' }}>
            <Form.Label>Price</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="1000.00"
                name={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} className="mt-2" style={{ minWidth: '10rem' }}>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="text"
              placeholder="1"
              name={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Form.Group className="my-3">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Made the Kessel Run in less than twelve parsec"
            rows={2}
            name={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <div>{error ? error : ''}</div>
        <Button type="submit">Add Product</Button>
      </Form>
    </div>
  )
}
