import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const {
      email,
      name,
      paymentId,
      talent,
      amount,
      category,
      groupName,
      memberCount,
      memberNames = [],
      memberEmails = [],
      members = []
    } = await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let emailHtml = '';
    let subject = '';
    let recipients = [];

    if (category === 'Group') {
      subject = `Footloose Monkey - Group Registration Confirmation (${groupName})`;

      // Create members list HTML - prioritize 'members' array if available
      let membersListHtml = '';
      if (members && members.length > 0) {
        membersListHtml = members.map(member =>
          `<li>${member.name || 'Member'} (${member.email || 'No email provided'})</li>`
        ).join('');
      } else if (memberNames.length > 0 && memberEmails.length > 0) {
        // If separate names and emails arrays are provided
        membersListHtml = memberNames.map((name, index) =>
          `<li>${name} (${memberEmails[index] || 'No email provided'})</li>`
        ).join('');
      } else if (memberEmails.length > 0) {
        // If only emails are provided
        membersListHtml = memberEmails.map(email =>
          `<li>${email}</li>`
        ).join('');
      } else {
        membersListHtml = '<li>No member details provided</li>';
      }

      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <div style="background-color: #004873; padding: 20px; text-align: center; border-radius: 5px 5px 0 0;">
            <h1 style="color: white; margin: 0;">Footloose Monkey</h1>
            <p style="color: #a3d0ff; margin: 5px 0 0;">Talent Competition</p>
          </div>
          
          <div style="padding: 20px;">
            <h2 style="color: #004873; margin-top: 0;">Group Registration Confirmation</h2>
            <p>Hello ${name || 'Team'},</p>
            
            <p>Thank you for registering your group <strong>${groupName}</strong> for the Footloose Monkey talent competition!</p>
            
            <div style="background-color: #f5f9fc; padding: 15px; border-radius: 5px; margin: 15px 0; border: 1px solid #e1e8ed;">
              <h3 style="color: #004873; margin-top: 0;">Registration Details</h3>
              <p><strong>Group Name:</strong> ${groupName}</p>
              <p><strong>Number of Members:</strong> ${memberCount}</p>
              <p><strong>Talent Category:</strong> ${talent}</p>
              <p><strong>Registration Fee:</strong> ₹${amount}</p>
              <p><strong>Transaction ID:</strong> ${paymentId}</p>
              
              <h4 style="color: #004873; margin-bottom: 5px;">Group Members:</h4>
              <ul style="margin-top: 5px; padding-left: 20px;">
                ${membersListHtml}
              </ul>
            </div>
            
            <p>We'll contact you soon with further details about the competition schedule and requirements.</p>
            
            <p>If you have any questions, please reply to this email or contact us at <a href="mailto:${process.env.SUPPORT_EMAIL}" style="color: #004873;">${process.env.SUPPORT_EMAIL}</a>.</p>
            
            <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #e1e8ed;">
              <p style="font-size: 0.9em; color: #666;">This is an automated message. Please do not reply directly to this email.</p>
            </div>
          </div>
        </div>
      `;

      // Add all group members to recipients (including the main contact email)
      recipients = [
        email, // Group leader/organizer email
        ...(members.length > 0 ?
          members.map(m => m.email).filter(Boolean) :
          memberEmails.filter(Boolean)
        )
      ].filter(Boolean);

      // Remove duplicates
      recipients = [...new Set(recipients)];
    } else {
      subject = `Footloose Monkey - Registration Confirmation (${name})`;
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <div style="background-color: #004873; padding: 20px; text-align: center; border-radius: 5px 5px 0 0;">
            <h1 style="color: white; margin: 0;">Footloose Monkey</h1>
            <p style="color: #a3d0ff; margin: 5px 0 0;">Talent Competition</p>
          </div>
          
          <div style="padding: 20px;">
            <h2 style="color: #004873; margin-top: 0;">Registration Confirmation</h2>
            <p>Hello ${name},</p>
            
            <p>Thank you for registering for the Footloose Monkey talent competition!</p>
            
            <div style="background-color: #f5f9fc; padding: 15px; border-radius: 5px; margin: 15px 0; border: 1px solid #e1e8ed;">
              <h3 style="color: #004873; margin-top: 0;">Registration Details</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Category:</strong> ${category}</p>
              <p><strong>Talent:</strong> ${talent}</p>
              <p><strong>Registration Fee:</strong> ₹${amount}</p>
              <p><strong>Transaction ID:</strong> ${paymentId}</p>
            </div>
            
            <p>We'll contact you soon with further details about the competition schedule and requirements.</p>
            
            <p>If you have any questions, please reply to this email or contact us at <a href="mailto:${process.env.SUPPORT_EMAIL}" style="color: #004873;">${process.env.SUPPORT_EMAIL}</a>.</p>
            
            <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #e1e8ed;">
              <p style="font-size: 0.9em; color: #666;">This is an automated message. Please do not reply directly to this email.</p>
            </div>
          </div>
        </div>
      `;
      recipients = [email].filter(Boolean);
    }

    // Send to all recipients (individual or group)
    const sendPromises = recipients.map(recipientEmail => {
      if (!recipientEmail) return Promise.resolve(); // Skip invalid emails

      return transporter.sendMail({
        from: `"Footloose Monkey" <${process.env.EMAIL_USERNAME}>`,
        to: recipientEmail,
        subject: subject,
        html: emailHtml,
      }).catch(err => {
        console.error(`Failed to send email to ${recipientEmail}:`, err);
        return null;
      });
    });

    await Promise.all(sendPromises);

    return NextResponse.json({
      success: true,
      message: "Email(s) sent successfully",
      recipients: recipients,
      count: recipients.length
    });

  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to send email(s)",
      error: error.message,
    }, { status: 500 });
  }
}