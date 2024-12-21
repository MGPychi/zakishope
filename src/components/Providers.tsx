import { CartProvider } from '@/context/CartContext'
import React, { ReactNode } from 'react'

const Providers = ({children}:{children:ReactNode}) => {
  return (
    <>
    <CartProvider>
        {children}
    </CartProvider>
    </>
  )
}

export default Providers