// utils/generateCookies.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();


export const generateCookies = (res, userId) => {
  // Generate access token
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });

  // Generate refresh token
  const refreshToken = jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  // Cookie options
  const cookieOptions = {
    httpOnly: process.env.NODE_ENV === "production",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  };

  // Set cookies
  res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: 10 * 60 * 1000, // 10 mins
  });

  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};



export const refreshAccessToken = (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  // Verify the refresh token
  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    req.user=decoded

    // Generate a new access token
    const accessToken = jwt.sign(
      { id: req.user.id},
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    // Cookie options
    const cookieOptions = {
      httpOnly: process.env.NODE_ENV === "production",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      
      maxAge: 10 * 60 * 1000, // 5 minutes
    };

    // Set the new access token cookie
    res.cookie("accessToken", accessToken, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      accessToken,
    });
  });
};

