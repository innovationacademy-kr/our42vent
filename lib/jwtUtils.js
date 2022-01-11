import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import consoleLogger from '../lib/consoleLogger.js';
import selectToken from '../models/selectToken.js';

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
    consoleLogger.error(err);
    return {
      verified: false,
      message: err.message,
    };
  }
}

function refreshSign(userId) {
  const payload = { id: userId };
  return jwt.sign(payload, secretKey, { expiresIn: '14d' });
}

// 토큰 유효성 검사
async function refreshVerify(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    const { id } = decoded;
    const storedToken = await selectToken(id);

    if (token.localeCompare(storedToken.content)) throw new Error('Token does not match!');

    return {
      verified: true,
      message: 'access token issued',
      id,
    };
  } catch (err) {
    consoleLogger.error(`Refresh Verify Error ${err}`);
    return {
      verified: false,
      message: err.message,
    };
  }
}

export { accessSign, accessVerify, refreshSign, refreshVerify };
