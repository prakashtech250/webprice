import React from 'react'
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";

const Account = async() => {
  const {getUser, isAuthenticated} = getKindeServerSession()
  console.log(await getUser())
  console.log('hello')
  return (await getUser())?(
    <div>found</div>
  ): (
    <div>hello</div>
  )
}

export default Account