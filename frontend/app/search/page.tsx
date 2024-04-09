"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { FormEvent, useState } from 'react'

const search = () => {
  const [asin, setAsin] = useState("")
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(asin)
  }
  return (
    <>
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col items-center mt-8 gap-2'>
        <label className='text-3xl'>Amazon Product Search</label>
        <div className='flex md:w-5/6 w-full gap-1 mt-6'>
          <Input className='bg-secondary' type="text" value={asin} onChange={(e) => setAsin(e.target.value)} placeholder='Enter Asin or Product Url'/>
          <Button className=''>Submit</Button>
        </div>
      </div>
    </form>
    </>
  )
}

export default search