import axios from 'axios';
import consoleLogger from '../../lib/consoleLogger.js';

export default async function getFtAccessToken(redisClient) {
  try {
    const exToken = await redisClient.get('ft_access_token');
    if (!exToken) {
      const res = await axios.post('https://api.intra.42.fr/oauth/token', {
        grant_type: 'client_credentials',
        client_id: process.env.FORTYTWO_APP_ID,
        client_secret: process.env.FORTYTWO_APP_SECRET,
      });
      const newToken = res.data.access_token;
      const result = await redisClient.setEx('ft_access_token', 6000, newToken);
      if (result.localeCompare('OK')) throw new Error(`failed to insert ft access token`);
      consoleLogger.info('getFtAccessToken : issued new token');
      return newToken;
    }
    return exToken;
  } catch (err) {
    throw new Error(err.message);
  }
}
