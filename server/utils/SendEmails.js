import transporter from "../config/mailconfig.js";

export const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: `"Expense Tracker" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
    return info;
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error;
  }
};
