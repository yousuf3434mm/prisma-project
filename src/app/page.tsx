import React from 'react'
import { products } from '../../utils/products'
import ProductCard from '@/components/Products/ProductCard'

const HomePage = () => {
  return (
    <div className='grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-8 border p-4 m-4'>
      {products.map(product => (
        <ProductCard key={product.id} data={product} />
      ))}
    </div>
  )
}

export default HomePage
