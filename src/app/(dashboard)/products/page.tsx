"use client"

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import ProductTable from '@/components/products/producttable'

 

function Products() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <>
    <div className='font-main'>
      <h1 className="font-bold lg:text-4xl sm:text-sm">Products (Food)</h1>
      <Input
        placeholder="Search Products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="max-w-sm mt-5"
      />
      <div className='mt-5'>
        <ProductTable />
      </div>
      </div>
    </>
  )
}

export default Products
