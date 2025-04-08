// File: /api/send-mail/route.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { email, name, paymentId, talent, amount, category, groupName, memberCount } = await request.json();
    
    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your email service
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content based on category
    let emailHtml = '';
    let subject = '';

    if (category === 'Group') {
      subject = `Footloose Monkey - Group Registration Confirmation (${groupName})`;
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #004873;">Group Registration Confirmation</h2>
          <p>Hello ${name},</p>
          
          <p>Thank you for registering your group <strong>${groupName}</strong> for the Footloose Monkey talent competition!</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #004873; margin-top: 0;">Registration Details</h3>
            <p><strong>Group Name:</strong> ${groupName}</p>
            <p><strong>Number of Members:</strong> ${memberCount}</p>
            <p><strong>Talent Category:</strong> ${talent}</p>
            <p><strong>Registration Fee:</strong> ₹${amount}</p>
            <p><strong>Transaction ID:</strong> ${paymentId}</p>
          </div>
          
          <p>We'll contact you soon with further details about the competition schedule and requirements.</p>
          
          <p>If you have any questions, please reply to this email or contact us at ${process.env.SUPPORT_EMAIL}.</p>
          
          <p>Best regards,<br/>The Footloose Monkey Team</p>
        </div>
      `;
    } else {
      subject = `Footloose Monkey - Registration Confirmation (${name})`;
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #004873;">Registration Confirmation</h2>
          <p>Hello ${name},</p>
          
          <p>Thank you for registering for the Footloose Monkey talent competition!</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #004873; margin-top: 0;">Registration Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Category:</strong> ${category}</p>
            <p><strong>Talent:</strong> ${talent}</p>
            <p><strong>Registration Fee:</strong> ₹${amount}</p>
            <p><strong>Transaction ID:</strong> ${paymentId}</p>
          </div>
          
          <p>We'll contact you soon with further details about the competition schedule and requirements.</p>
          
          <p>If you have any questions, please reply to this email or contact us at ${process.env.SUPPORT_EMAIL}.</p>
          
          <p>Best regards,<br/>The Footloose Monkey Team</p>
        </div>
      `;
    }

    // Send mail with defined transport object
    await transporter.sendMail({
      from: `"Footloose Monkey" <${process.env.EMAIL_USERNAME}>`,
      to: email,
      subject: subject,
      html: emailHtml,
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });

  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to send email",
      error: error.message,
    }, { status: 500 });
  }
}