import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const secretKey = process.env.SECRET_KEY;

const accessSign = userId => {
  const payload = {
    id: userId,
  };
  return jwt.sign(payload, secretKey, {
    expiresIn: '1h',
  });
};

const accessVerity = token => {
  let decoded = null;
  try {
    decoded = jwt.verify(token, secretKey);
    return {
      ok: true,
      id: decoded.id,
    };
  } catch (error) {
    return {
      ok: false,
      message: error.message,
    };
  }
};

export { accessSign, accessVerity };
