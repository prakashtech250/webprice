import React from 'react'
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import Profile from './profile';

const Account = async() => {
  const {getUser, isAuthenticated} = getKindeServerSession()
  const User = getUser()
  return (await getUser())?(
    <div>hi</div>
  ): (
    <div>hello</div>
  )
}

export default Account