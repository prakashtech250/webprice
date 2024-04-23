import {connect} from "@/dbConfig/dbConfig"
import User from '@/models/userModels'
import {NextResponse, NextRequest} from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailers'


export async function POST(request:NextRequest){
    try{
        connect()
        const reqBody = await request.json()
        const {username, email, password} = reqBody
        console.log(reqBody);

        const user = await User.findOne({email})
        if (user){
            return NextResponse.json({
                error: "User already exists",
                status: 400
            })
        }
        
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email, 
            password: hashedPassword
        })
        const savedUser = await newUser.save();
        console.log(savedUser)

        await sendEmail({email, emailType:'VERIFY', userId:savedUser._id})
        return NextResponse.json({
            message: 'User Regestered successfully',
            success: true,
            savedUser
        })
        
    }
    catch(error){
        return NextResponse.json({error: error, status: 500})
    }
}