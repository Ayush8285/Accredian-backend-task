const express = require("express");
const { PrismaClient } = require("@prisma/client");
const sendReferralEmail = require("./nodemailer");

const prisma = new PrismaClient();
const router = express.Router();

router.post("/refer", async (req, res) => {
    const { referrerName, referrerEmail, refereeName, refereeEmail, courseName } = req.body;

    if (!referrerName || !referrerEmail || !refereeName || !refereeEmail || !courseName) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Checking if referrerEmail is already exists
        const existingReferral = await prisma.referral.findUnique({
            where: { referrerEmail },
        });

        if (existingReferral) {
            return res.status(400).json({ error: "This email has already been used for referral" });
        }

        // Send email
        await sendReferralEmail(referrerName, referrerEmail, refereeName, refereeEmail, courseName);

        res.json({ message: "Referral stored & email sent successfully!" });
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});


module.exports = router;
