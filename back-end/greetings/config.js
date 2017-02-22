module.exports.database = (env) => {
  const config = {
    "development": {
      "database": process.env.RDS_DATABASE,
      "username": process.env.RDS_USER,
      "password": process.env.RDS_PASSWORD,
      "host"    : process.env.RDS_HOST,
      "port"    : process.env.RDS_PORT,
      "dialect" : "mysql",
      "logging" : true
    },
    "test": {
    },
    "production": {
    }
  };

  return config[env];
};
