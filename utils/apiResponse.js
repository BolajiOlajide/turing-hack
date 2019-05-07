import logger from '../logger';


const apiResponse = (res, status, data, responseCode = 200, meta = {}) => {
  const logMessage = `Response Code: ${responseCode} - message: ${JSON.stringify(data)}`;
  if ((responseCode !== 200 && responseCode !== 201)) {
    logger.error(logMessage);
  } else {
    logger.info(logMessage);
  }

  if (status === 'success') {
    const response = {
      status,
      data,
      ...meta
    };

    return res.json(response).status(responseCode);
  }
  responseCode = responseCode || 400;
  return res.json({ status, message: data }).status(responseCode);
};

export default apiResponse;
