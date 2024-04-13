import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

const LanguageToggle = () => {
  return (
    <>
        <Select>
            <SelectTrigger className='w-[75px]'>
                <SelectValue placeholder='lang'/>
            </SelectTrigger>
            <SelectContent className='w-[50px]'>
                <SelectItem value='English'><img src='/flags/united-states.png' width='20px'></img></SelectItem>
                <SelectItem value='Germany'><img src='/flags/united-states.png' width='20px'></img></SelectItem>
                <SelectItem value='Denmary'><img src='/flags/united-states.png' width='20px'></img></SelectItem>
                <SelectItem value='Netherland'><img src='/flags/united-states.png' width='20px'></img></SelectItem>
            </SelectContent>
        </Select>
    </>
  )
}

export default LanguageToggle