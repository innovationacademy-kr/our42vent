import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import consoleLogger from './consoleLogger.js';
import { insertToken, selectToken } from '../models/accessTokenRedis.js';

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

// access token 생성
export function accessSign(userId) {
  const payload = { id: userId };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

// access token 유효성 검사
export function verifyAccess(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return {
      verified: true,
      id: decoded.id,
    };
  } catch (err) {
    consoleLogger.error('verifyAccess : verify error : ', err);
    return {
      verified: false,
      message: err.message,
    };
  }
}

// refresh token 생성
export function refreshSign(userId) {
  const payload = { id: userId };
  return jwt.sign(payload, secretKey, { expiresIn: '14d' });
}

// refresh token 유효성 검증 및 DB와 비교
export async function verifyRefresh(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    const { id } = decoded;

    // DB에서 저장된 토큰을 Select
    const storedToken = await selectToken(id);

    if (!storedToken) throw new Error('Token does not exist in DB');
    if (token.localeCompare(storedToken)) throw new Error('Token does not match!');

    return {
      verified: true,
      message: 'Refreshtoken Verify Success',
      id,
    };
  } catch (err) {
    consoleLogger.error('verifyRefresh : verify error : ', err.stack);
    return {
      verified: false,
      message: err.message,
    };
  }
}

// refresh가 없을 때 refresh & access 토큰을 생성하고 쿠키에 저장
export function setTokens(res, user) {
  const accessToken = accessSign(user.id);
  const refreshToken = refreshSign(user.id);

  res.cookie('accessToken', accessToken, {
    secure: true,
    httpOnly: true,
    expires: new Date(Date.now() + 3.6e6), // 1시간 뒤 만료
    sameSite: 'lax',
  });

  res.cookie('refreshToken', refreshToken, {
    secure: true,
    httpOnly: true,
    expires: new Date(Date.now() + 1.2096e9), // 2주 뒤 만료
    sameSite: 'lax',
  });
  insertToken(user.id, refreshToken);
}
