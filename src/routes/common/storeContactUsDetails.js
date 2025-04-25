
const config = require('config');
const { postApiCall } = require('./apiCall');

const storeContactUsDetails = async (body) => {
  console.log('storeContactUsDetails');
  const endpoint = config.get('drupal.apiUrl');

  /**
   * Write a logic to make a call to drupal to store contact us details
   */
  try {
    const response = await postApiCall(endpoint, body);
    if (!(response && response.data)) {
      throw new Error();
    }
    return {
      status: 'OK',
      code: 200,
      success: response.data.success,
    };
  } catch (err) {
    console.log('Error in drupal response');
    return {
      status: 'NOK',
      code: 400,
      error: {
        message: 'Error in drupal response',
        error: err,
      },
    };
  }
};

module.exports = storeContactUsDetails;
