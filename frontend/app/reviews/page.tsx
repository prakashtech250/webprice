"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { FormEvent } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const reviews = () => {
  const [reviews, setReviews] = useState([])
  const [asin, setAsin] = useState("");

  const fetchRevies = async(asin:string) => {
    try{
      const response = await axios.get('https://amazonreviews.vercel.app/reviews/us/1546017453')
      console.log(response)
    } catch(error){
      console.log(error)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(asin)
    fetchRevies(asin)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col items-center mt-8 gap-2'>
        <label className='text-3xl'>Amazon Product Reviews</label>
        <div className='flex md:w-5/6 w-full gap-2 mt-6'>
          <Input className='bg-background' type="text" value={asin} onChange={(e) => setAsin(e.target.value)} placeholder='Enter Asin or Product Url'/>
          <Button className=''>Submit</Button>
        </div>
        <div className='flex flex-col gap-4 md:w-5/6 w-full mt-5'>
        <Card className='bg-card border-none shadow-sm shadow-secondary'>
          <CardHeader>
            <CardTitle className='text-lg'>This is the title</CardTitle>
            <CardDescription>This is the description</CardDescription>
          </CardHeader>
        </Card>
        </div>
      </div>
    </form>
  )
}

export default reviews