import { configureStore } from "@reduxjs/toolkit"
import CartReducer from './CartReducer'

export default store=configureStore({
    reducer: {
        cart: CartReducer
    }
})