import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // [{ productId: 'uuid', quantity: 1 }, ...]
  },
  reducers: {
    // Reemplaza el carrito actual con los datos recibidos del backend
    setLocalCart: (state, action) => {
      state.items = action.payload
    },
    // Añadir o incrementar cantidad si ya existe
    addLocalCartItem: (state, action) => {
      const { productId, quantity } = action.payload
      const existingItem = state.items.find(
        (item) => item.productId === productId,
      )

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.items.push({ productId, quantity })
      }
    },

    // Eliminar completamente un producto del carrito
    removeLocalCartItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload,
      )
    },

    // Vaciar el carrito (cuando se hace logout o checkout)
    clearLocalCart: (state) => {
      state.items = []
    },
  },
})

export const {
  setLocalCart,
  addLocalCartItem,
  removeLocalCartItem,
  clearLocalCart,
} = cartSlice.actions

export default cartSlice.reducer
