const config = require('config');
const { getApiCall } = require('./apiCall');

const healthCheckDrupal = async () => {
  console.log('healthCheckDrupal');
  const endpoint = `${config.get('drupal.apiUrl')}/health`;
  const apiKey = process.env.DRUPAL_API_KEY;

  // Write a logic to make a health check call to drupal
  try {
    const headers = { 'X-Api-Key': apiKey };
    const response = await getApiCall(endpoint, headers);
    if (!(response && response.data)) {
      throw new Error();
    }

    return { status: 'OK', code: 200, success: response.data };
  } catch (err) {
    console.log('Error in drupal response');
    return {
      status: 'NOK',
      code: 400,
      error: { message: 'Error in drupal response', error: err },
    };
  }
};

module.exports = healthCheckDrupal;
