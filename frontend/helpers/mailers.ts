import nodemailer from 'nodemailer'
import User from '@/models/userModels'
import bcryptjs from 'bcryptjs'

export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        const salt = await bcryptjs.genSalt(10);
        const hashedToken = await bcryptjs.hash(userId, salt);
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "bbf06be0d83434",
              pass: "4be2e36615a95b"
            }
          });
          if (emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpery: Date.now() + 3600000
            })
          }
          else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId, {
                forgetPasswordToken: hashedToken,
                forgetPasswordTokenExpiry: Date.now() + 3600000
            })

          }

        const mailOptions = {
            from: 'prakashtech250@gmail.com',
            to: email,
            subject: emailType === 'VERIFY'? 'Verify you email': 'Reset Your password',
            html: hashedToken
        }

        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse
    }
    catch(error){
        console.log('Error on sending email ', error)
    }
}