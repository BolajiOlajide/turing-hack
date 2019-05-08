export const getToken = (req) => {
  if (!('user-key' in req.headers)) {
    const tokenError = new Error('Token not found!');
    tokenError.name = 'TokenError';
    throw tokenError;
  } else if (req.headers['user-key'] && req.headers['user-key'].split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};
