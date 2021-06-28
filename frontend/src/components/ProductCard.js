import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { FaCartPlus } from 'react-icons/fa'
import { IconContext } from 'react-icons'

export default function ProductCard({ product, cart, handleAddProduct }) {
  return (
    <Card key={product.id} style={{ width: '18rem', margin: '1rem' }}>
      <Card.Img src={`https://picsum.photos/seed/${product.id}/318/180`} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-center">
        <Button
          variant="outline-*"
          onClick={() => {
            handleAddProduct(product.id)
          }}
          disabled={cart.includes(product.id)}
        >
          <span style={{ marginRight: '10px' }}>
            ${product.price.toFixed(2)}
          </span>
          <IconContext.Provider value={{ color: '#47a359', size: '2em' }}>
            <FaCartPlus />
          </IconContext.Provider>
        </Button>
      </Card.Footer>
    </Card>
  )
}
