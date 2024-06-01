import React from 'react'
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import Link from 'next/link';

const dashboard = async() => {
    const {isAuthenticated} = getKindeServerSession();

  return (await isAuthenticated)?(
    <div>You are logged in</div>
):(
  <div>You are logged out</div>
);
}

export default dashboard