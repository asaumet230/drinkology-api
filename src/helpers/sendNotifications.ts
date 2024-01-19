import nodemailer from 'nodemailer';
import path from 'path';



export const sendVerificationEmail = async (email: string, verificationCode: string, subject: string): Promise<any> => {

    try {

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: `${process.env.EMAIL_USER}`,
              pass: `${process.env.EMAIL_PASSWORD}`,
            },
        });
        
        const mailOptions = {
            from: 'info@drinkology.info',
            to: `${email}`,
            subject: `${subject}`,
            text: 'Please enter this code in the drinkology verification field to omit you are not a robot',
            html: `<h1>Verification Code</h1>
            <h2>Code: ${verificationCode}</h2>
            <p>Body of the email</p>
            <img src="cid:unique@gmail.com>"/>`,
            attachments: [{
                filename: 'logo-drinkology.png',
                path: path.resolve(__dirname, '../public/images/logo-drinkology.png'),
                cid: 'unique@gmail.com'
            }]
        };
        
        await transporter.sendMail(mailOptions);

    } catch (error) {
        console.log(error);
        throw Error(`Sorry an error occurred: ${error}`);
    }
}


export const sendCommentNotification = async ( content: string, title: string, userEmail: string, userName: string ): Promise<any> => {

    try {

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: `${process.env.EMAIL_USER}`,
              pass: `${process.env.EMAIL_PASSWORD}`,
            },
        });

        const mailOptions = {
            from: 'info@drinkology.info',
            to: process.env.EMAIL_COMMENTS_NOTIFICATION,
            subject: `New comment on: "${ title }", needs approval`,
            text: 'Urgent notification a new comment needs approval',
            html: `<h1> New coment on ${ title } </h1>
            <h3> User Email: ${ userEmail } </h3>
            <h3> UserName: ${ userName } </h3>
            <h4> Comment: "${ content }" </h4>
            <img src="cid:unique@gmail.com>"/>`,
            attachments: [{
                filename: 'logo-drinkology.png',
                path: path.resolve(__dirname, '../public/images/logo-drinkology.png'),
                cid: 'unique@gmail.com'
            }]
        };
        
        await transporter.sendMail(mailOptions);

        
    } catch (error) {
        console.log(error);
        throw Error(`Sorry an error occurred: ${error}`);
    }

}