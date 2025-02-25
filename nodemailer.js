const { PrismaClient } = require("@prisma/client");
const nodemailer = require("nodemailer");
require("dotenv").config();

const prisma = new PrismaClient();

async function sendReferralEmail(referrerName, referrerEmail, refereeName, refereeEmail, courseName) {
    console.log("🚀 Sending email...");
    

    // Store referral data in MySQL
    try {
        const newReferral = await prisma.referral.create({
            data: { referrerName, referrerEmail, refereeName, refereeEmail, courseName },
        });
        console.log("✅ Referral saved to MySQL:", newReferral);
    } catch (error) {
        console.error("❌ Error saving to MySQL:", error);
    }

    // Send Email
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,  
            pass: process.env.EMAIL_PASS,  
        },
    });
    

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: refereeEmail,
        subject: "Course Referral Invitation",
        text: `You've been referred to the ${courseName} course by ${referrerName} (${referrerEmail}). Sign up today!`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent:", info.response);
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
}

module.exports = sendReferralEmail;
