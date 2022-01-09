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
function accessVerify(token) {
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

function refreshSign(userId) {
  return jwt.sign(secretKey, { expiresIn: '14d' });
}

// 토큰 유효성 검사
async function refreshVerify(token) {
  try {
    jwt.verify(token, secretKey);
    return {
      verified: true,
      message: 'access token issued',
    };
  } catch (err) {
    return {
      verified: false,
      message: err.message,
    };
  }
}

export { accessSign, accessVerify, refreshSign, refreshVerify };
