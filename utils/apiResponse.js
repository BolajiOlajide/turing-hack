import logger from '../logger';


const apiResponse = (res, status, data, responseCode = 200, code = null, field = null) => {
  const logMessage = `Response Code: ${responseCode} - message: ${JSON.stringify(data)}`;
  if ((responseCode !== 200 && responseCode !== 201)) {
    logger.error(logMessage);
  } else {
    logger.info(logMessage);
  }

  if (status === 'success') {
    return res.status(responseCode).json(data);
  }
  responseCode = responseCode || 400;
  return res.status(responseCode).json({
    error: {
      code,
      message: data,
      field,
      status: responseCode
    }
  });
};

export default apiResponse;
