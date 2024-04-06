import { LoginLink, LogoutLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import React from 'react'
import { Button } from './ui/button'
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const AuthButton = () => {
    const { isAuthenticated, isLoading } = useKindeBrowserClient();
    // if (isLoading) return <div>Loading...</div>;
    return ( 
        isAuthenticated ? 
        <>
            <LogoutLink><Button>Log Out</Button></LogoutLink>
        </> : <>
            <LoginLink><Button>Sign In</Button></LoginLink>
            <RegisterLink><Button variant="outline">Sign Up</Button></RegisterLink>  
        </>
    )
}

export default AuthButton