import axios from 'axios'

const baseUrl = 'http://shopfront-dev.us-west-2.elasticbeanstalk.com'
// const baseUrl = 'http://127.0.0.1:8000'

const createProduct = async (name, description, price, quantity) => {
  return await axios.post(
    `${baseUrl}/api/products/create`,
    {
      name,
      description,
      price,
      quantity,
    },
    {
      headers: {
        Authorization: `JWT ${localStorage.getItem('auth-token')}`,
      },
    }
  )
}

const getMyShopData = async () => {
  return await axios.get(`${baseUrl}/api/my-shop-data`, {
    headers: {
      Authorization: `JWT ${localStorage.getItem('auth-token')}`,
    },
  })
}

const getCartItems = async () => {
  const response = await axios.get(`${baseUrl}/api/my-cart-products`, {
    headers: {
      Authorization: `JWT ${localStorage.getItem('auth-token')}`,
    },
  })
  return response
}

const addProductToCart = async (productId) => {
  const response = await axios.post(
    `${baseUrl}/api/add-product-to-cart`,
    {
      product_id: productId,
    },
    {
      headers: {
        Authorization: `JWT ${localStorage.getItem('auth-token')}`,
      },
    }
  )
  return response
}

const searchProducts = async (search) => {
  const response = await axios.get(`${baseUrl}/api/search-products`, {
    params: { search },
  })
  return response
}

const getCurrentUser = async () => {
  const response = await axios.get(`${baseUrl}/api/current-user`, {
    headers: {
      Authorization: `JWT ${localStorage.getItem('auth-token')}`,
    },
  })
  return response
}

const updateProductQuantity = async (productId, quantity) => {
  const response = await axios.post(
    `${baseUrl}/api/update-product-quantity`,
    {
      id: productId,
      quantity: quantity,
    },
    {
      headers: {
        Authorization: `JWT ${localStorage.getItem('auth-token')}`,
      },
    }
  )
  return response
}

const removeItemFromCart = async (productId) => {
  const response = await axios.post(
    `${baseUrl}/api/remove-product-from-cart`,
    {
      productId,
    },
    {
      headers: {
        Authorization: `JWT ${localStorage.getItem('auth-token')}`,
      },
    }
  )
  return response
}

const checkout = async (productIds) => {
  const response = await axios.post(
    `${baseUrl}/api/checkout`,
    { productIds },
    {
      headers: {
        Authorization: `JWT ${localStorage.getItem('auth-token')}`,
      },
    }
  )
  return response
}

const getProducts = async () => {
  const response = await axios.get(`${baseUrl}/api/products`)
  return response
}

const signUp = async (username, password) => {
  const response = await axios.post(`${baseUrl}/api/users/`, {
    username,
    password,
  })
  return response
}

const getToken = async (username, password) => {
  const response = await axios.post(`${baseUrl}/get-jwt-token/`, {
    username,
    password,
  })
  return response
}

export {
  createProduct,
  getMyShopData,
  getCartItems,
  addProductToCart,
  searchProducts,
  getCurrentUser,
  updateProductQuantity,
  removeItemFromCart,
  checkout,
  getProducts,
  signUp,
  getToken,
}
