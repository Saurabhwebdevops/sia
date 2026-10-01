require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

/* =========================================
   CORS
========================================= */

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://sia-9rgb.vercel.app/"
    ],
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true
  })
);

app.use(express.json());

/* =========================================
   GMAIL SMTP
========================================= */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

/* =========================================
   BOOKING API
========================================= */

app.post("/api/bookings", async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      concern,
      date,
      time,
      notes
    } = req.body;

    /* =========================================
       VALIDATION
    ========================================= */

    if (!name || !phone || !concern || !date || !time) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields."
      });
    }

    /* =========================================
       FORMAT APPOINTMENT DATE
    ========================================= */

    const appointmentDate = new Date(date).toLocaleDateString(
      "en-IN",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Kolkata"
      }
    );

    /* =========================================
       ADMIN EMAIL
    ========================================= */

    await transporter.sendMail({
  from: `"Sia Homoeo Clinic" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Consultation Booking - ${name}`,

      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: auto;
          padding: 20px;
          color: #333;
        ">

          <h2 style="color:#0e211c;">
            New Consultation Booking
          </h2>

          <hr>

          <p>
            <strong>Name:</strong> ${name}
          </p>

          <p>
            <strong>Phone:</strong> ${phone}
          </p>

          <p>
            <strong>Email:</strong>
            ${email || "Not provided"}
          </p>

          <p>
            <strong>Concern:</strong> ${concern}
          </p>

          <p>
            <strong>Date:</strong> ${appointmentDate}
          </p>

          <p>
            <strong>Time:</strong> ${time} IST
          </p>

          <p>
            <strong>Notes:</strong>
          </p>

          <p>
            ${notes || "No additional notes"}
          </p>

        </div>
      `
    });

    /* =========================================
       CLIENT CONFIRMATION EMAIL
    ========================================= */

    if (email) {
      await transporter.sendMail({
        from: `"Sia Homoeo Clinic" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: "Your Consultation Booking Confirmation",

        html: `
          <div style="
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: auto;
            padding: 20px;
            color: #333;
          ">

            <h2 style="color:#0e211c;">
              Consultation Booking Confirmation
            </h2>

            <p>
              Dear ${name},
            </p>

            <p>
              Thank you for booking a consultation with
              <strong>Sia Homoeo Clinic</strong>.
            </p>

            <div style="
              background:#f5f3ea;
              padding:20px;
              border-radius:12px;
              margin:20px 0;
            ">

              <p>
                <strong>Concern:</strong> ${concern}
              </p>

              <p>
                <strong>Date:</strong> ${appointmentDate}
              </p>

              <p>
                <strong>Time:</strong> ${time} IST
              </p>

              <p>
                <strong>Phone:</strong> ${phone}
              </p>

            </div>

            <p>
              Your consultation request has been received successfully.
            </p>

            <p>
              Our team will contact you if any additional
              information is required.
            </p>

            <p>
              Regards,<br>
              <strong>Sia Homoeo Clinic</strong>
            </p>

          </div>
        `
      });
    }

    /* =========================================
       SUCCESS RESPONSE
    ========================================= */

    return res.status(200).json({
      success: true,
      message: "Booking submitted successfully."
    });

  } catch (error) {

    console.error("Gmail booking error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to send booking confirmation."
    });
  }
});

/* =========================================
   HEALTH CHECK
========================================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Sia Homoeo Clinic booking API is running"
  });
});

/* =========================================
   VERCEL EXPORT
========================================= */

module.exports = app;

