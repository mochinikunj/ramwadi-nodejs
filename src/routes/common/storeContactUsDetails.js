const storeContactUsDetails = async (body) => {
  console.log('storeContactUsDetails');

  /**
   * Write a logic to make a call to drupal to store contact us details
   */

  // default response
  return {
    status: 'OK',
    code: '200',
    success: true,
  };
};

module.exports = storeContactUsDetails;
