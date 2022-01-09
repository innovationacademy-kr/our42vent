import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const secretKey = process.env.SECRET_KEY;

// access token 생성
function accessSign(userId) {
  const payload = { id: userId };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

// 토큰 유효성 검사
function accessVerity(token) {
  let decoded = null;
  try {
    decoded = jwt.verify(token, secretKey);
    return {
      verified: true,
      id: decoded.id,
    };
  } catch (err) {
    return {
      verified: false,
      message: err.message,
    };
  }
}

export { accessSign, accessVerity };
