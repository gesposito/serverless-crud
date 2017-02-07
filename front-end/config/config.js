module.exports.s3Bucket = () => {
  const s3Bucket = 'serverless-greeting-xxx';
  // const s3Bucket = 'serverless-greeting-xxx';

  return s3Bucket;
};

module.exports.apiAuthentication = () => {
  const apiGateway = 'http://localhost:3000';
  // const apiAuthentication = 'https://xxxxxxxxxx.execute-api.us-west-2.amazonaws.com/dev';

  return apiAuthentication;
};

module.exports.apiGateway = () => {
  const apiGateway = 'http://localhost:3000';
  // const apiGateway = 'https://xxxxxxxxxx.execute-api.us-west-2.amazonaws.com/dev';

  return apiGateway;
};
