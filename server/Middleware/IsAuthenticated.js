import jwt from 'jsonwebtoken';

const isAuthenticated = (req, res, next) => {
  
  const token =  req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: 'No token provided. Please log in.' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    req.user = decoded; 

    next(); // Token is valid, move to the next middleware or route handler
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

export default isAuthenticated;
