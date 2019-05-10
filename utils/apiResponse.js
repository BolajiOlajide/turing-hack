export default (res, status, data, responseCode = 200, code = null, field = null) => {
  if (status === 'success') {
    return res.status(responseCode).json(data);
  }
  responseCode = responseCode || 400;
  return res.status(responseCode).json({
    error: {
      code,
      message: data,
      field
    }
  });
};
