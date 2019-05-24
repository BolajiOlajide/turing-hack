import crypto from 'crypto';

export const generateCartId = () => `${crypto.randomBytes(5).toString('hex')
  .substring(5)}${Date.now()}`;
