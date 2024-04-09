"use client"

import { Input } from '@/components/ui/input'
import React from 'react'

const search = () => {
  return (
    <>
      <div className='flex flex-col gap-2 items-center mt-8'>
        <h1 className='text-3xl antialiased'>Amazon Product Search</h1>
        <div className='mt-8 w-full'>
          <Input type='text' className='w-full' placeholder='Enter Asin code'/>
        </div>
      </div>
    </>
  )
}

export default search