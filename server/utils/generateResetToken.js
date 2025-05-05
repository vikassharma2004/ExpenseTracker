import crypto from 'crypto';

function generateResetPasswordToken() {
  const resetToken = crypto.randomBytes(20).toString('hex');

  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  const expires = Date.now() + 10 * 60 * 1000; // Expires in 10 minutes

  return {
    resetToken,      // send this to the user via email
    hashedToken,     // store this in your DB
    expires,         // store this in your DB as resetPasswordExpires
  };
}

export default generateResetPasswordToken