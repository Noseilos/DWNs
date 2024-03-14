import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // Ensure that 'res' is the Express response object
  if (res && typeof res.cookie === 'function') {
    // Set JWT as HTTP-only cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
  } else {
    // If 'res' is not the expected object, log an error
    console.error('Invalid response object provided to generateToken function');
  }
};

export default generateToken;
