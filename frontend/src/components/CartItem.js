import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { MdRemoveShoppingCart } from 'react-icons/md'
import { IconContext } from 'react-icons'

export default function CartItem({ product, removeCallback }) {
  return (
    <Card key={product.id} style={{ width: '18rem', margin: '1rem' }}>
      <Card.Img src={`https://picsum.photos/seed/${product.id}/318/180`} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Subtitle>${product.price.toFixed(2)}</Card.Subtitle>
        <Card.Text>{product.description}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-center">
        <Button
          variant="outline-*"
          onClick={() => {
            removeCallback(product.id)
          }}
        >
          <span style={{ marginRight: '10px' }}>Remove from cart</span>
          <IconContext.Provider value={{ color: '#dc3545', size: '2em' }}>
            <MdRemoveShoppingCart />
          </IconContext.Provider>
        </Button>
      </Card.Footer>
    </Card>
  )
}
