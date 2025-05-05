export const resetPasswordTemplate = (username, resetUrl) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Reset Your Password</title>
      <style>
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f9fafb;
          margin: 0;
          padding: 0;
        }

        .email-container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          animation: fadeIn 0.6s ease-in-out;
        }

        .email-header {
          background-color: #1f2937;
          color: #ffffff;
          text-align: center;
          padding: 30px 20px;
        }

        .email-header h1 {
          margin: 0;
          font-size: 26px;
        }

        .email-content {
          padding: 30px 25px;
          color:rgb(92, 107, 130);
          line-height: 1.6;
        }

        .email-content p {
          margin-bottom: 16px;
        }

        .cta-button {
          display: inline-block;
          background-color:rgb(224, 229, 237);
          color:rgb(8, 8, 8);
          text-decoration: none;
          padding: 14px 24px;
          border-radius: 6px;
          font-weight: 600;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .cta-button:hover {
          background-color:rgba(105, 106, 108, 0.13);
          transform: translateY(-2px);
        }

        .footer {
          text-align: center;
          font-size: 12px;
          color: #9ca3af;
          padding: 20px;
          background-color: #f3f4f6;
        }

        @media (max-width: 600px) {
          .email-content {
            padding: 20px 15px;
          }

          .cta-button {
            padding: 12px 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h1>Expense Tracker</h1>
        </div>

        <div class="email-content">
          <p>Hi <strong>${username}</strong>,</p>
          <p>We received a request to reset your password. Click the button below to continue:</p>
          <a href="${resetUrl}" class="cta-button">Reset Password</a>
          <p>This link will expire after clicking.</p>
          <p>If you didn’t request this, you can safely ignore this email.</p>
          <p>Cheers,<br>The Expense Tracker Team</p>
        </div>

        <div class="footer">
          <p>Need help? Contact our support team anytime.</p>
          <p>&copy; 2025 Expense Tracker. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
