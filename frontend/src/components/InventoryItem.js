import React, { useState } from 'react'
import { Button, Card, Form, Modal, FormControl } from 'react-bootstrap'
import { VscEdit } from 'react-icons/vsc'
import { updateProductQuantity } from '../Requests'

/**
 * This component takes a product and renders the data as an inventory item.
 * @param product - the product to render the card for
 */
export default function InventoryItem({ product }) {
  const [modalShow, setModalShow] = useState(false)
  const [quantity, setQuantity] = useState(product.quantity)
  const [ogQuantity, setOgQuantity] = useState(product.quantity)

  // api call to update the product's quantity
  const handleQuantityChange = async (id, newQuantity) => {
    try {
      await updateProductQuantity(id, newQuantity)
      setOgQuantity(newQuantity)
      setModalShow(false)
    } catch (error) {
      setModalShow(false)
    }
  }

  return (
    <Card key={product.id} style={{ width: '18rem', margin: '1rem' }}>
      <Card.Img src={`https://picsum.photos/seed/${product.id}/318/180`} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          ${parseFloat(product.price).toFixed(2)}
        </Card.Subtitle>
        <Card.Text>{product.description}</Card.Text>
      </Card.Body>
      <Card.Footer style={{ textAlign: 'center' }}>
        <Button
          variant="outline-*"
          onClick={() => {
            setModalShow(true)
          }}
        >
          <strong>{ogQuantity}</strong> left in stock <VscEdit />
        </Button>
        <Modal
          centered
          size="sm"
          show={modalShow}
          onHide={() => setModalShow(false)}
        >
          <Modal.Header>
            <Modal.Title>{product.name} quantity</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <FormControl
                type="text"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value)
                }}
              />
            </Form.Group>
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
                if (ogQuantity === quantity) {
                  setModalShow(false)
                } else {
                  handleQuantityChange(product.id, quantity)
                }
              }}
            >
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Footer>
    </Card>
  )
}
