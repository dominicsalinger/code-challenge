import React, { useState, useEffect } from 'react'
import { getMyShopData } from '../Requests'
import InventoryItem from './InventoryItem'

/**
 * This partial view renders the user's inventory.
 *
 * @param existingProducts - This prop is updated with the results of the AddProduct form to avoid having to re-query for inventory
 */
export default function Inventory({ existingProducts }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    let isMounted = true
    async function getProducts() {
      const response = await getMyShopData()
      if (isMounted) {
        setProducts(response.data)
      }
    }
    getProducts()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div>
      {products.length > 0 && <h4>Inventory</h4>}
      <div
        className="inventory-container"
        style={{ display: 'flex', flexWrap: 'wrap' }}
      >
        {existingProducts.concat(products).map((product) => (
          <InventoryItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
