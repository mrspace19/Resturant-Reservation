import ErrorHandler from "../middlewares/error.js";
import { Reservation } from "../models/reservation.js";
import nodemailer from 'nodemailer';
const sendReservation = async (req, res, next) => {
  const { firstName, lastName, email, date, time, phone } = req.body;
  console.log("requests",req.body);
  if (!firstName || !lastName || !email || !date || !time || !phone) {
    return next(new ErrorHandler("Please Fill Full Reservation Form!", 400));
  }
  const isExpired = (reservationDate, reservationTime) => {
    const reservationDateTime = new Date(`${reservationDate}T${reservationTime}`);
    const currentDateTime = new Date();
    return reservationDateTime < currentDateTime;
  };
try {
const reserve= await Reservation.find({});
const newreserve=reserve.filter(r => {
  return !isExpired(r.date, r.time);
})
  if(newreserve.length<=20){
    const transporter=nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587, // Use 465 for SSL, 587 for TLS
      secure: false, 
  auth:{
    user:process.env.SMTP_MAIL,
    pass:process.env.SMTP_PASSWORD
  },
  tls: {
    rejectUnauthorized: false,
  },
     });
     const mailOptions={
      from:process.env.SMTP_MAIL,
      to:email,
      subject:"Reservation Confirmation",
      text:`Dear ${firstName} ${lastName},\n\nYour reservation for ${date} at ${time} has been confirmed.\n\nFor any queries or cancellations, please use the following contact details: ${phone} or ${email}.`
     }
      await transporter.sendMail(mailOptions,(error,info)=>{
        console.log("mail");
      if(error){
        console.log("error: "+error);
      }
      else{
        console.log("Email sent"+info.response);
      }
     })
      // await transporter.sendMail(mailOptions);
      
    await Reservation.create({ firstName, lastName, email, date, time, phone });
    res.status(200).json({
      success: true,
      message: "Reservation Sent Successfully!",
    });
    console.log("Email sent successfully");
  } else{
    res.status(400).json({
      success: false,
      message: "Sorry, we are fully booked for the selected date and time. Please try another day",
    });
  }
   
}catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return next(new ErrorHandler(validationErrors.join(', '), 400));
    }

    // Handle other errors
    return next(error);
  }
  
};


export default sendReservation;

