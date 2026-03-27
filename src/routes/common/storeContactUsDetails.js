const config = require('config');
const { postApiCall } = require('./apiCall');

const storeContactUsDetails = async (body) => {
  console.log('storeContactUsDetails');
  const endpoint = `${config.get('drupal.apiUrl')}/contact-submission`;
  const apiKey = process.env.DRUPAL_API_KEY;

  /**
   * Write a logic to make a call to drupal to store contact us details
   */
  try {
    const headers = {
      'X-Api-Key': apiKey,
    };
    const response = await postApiCall(endpoint, body, headers);
    if (!(response && response.data)) {
      throw new Error();
    }
    return {
      status: 'OK',
      code: 200,
      success: response.data,
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
