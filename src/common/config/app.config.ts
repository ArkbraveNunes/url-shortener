export default () => ({
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.API_PORT ?? '80'),
  appName: 'Url Shortener',
  appDescription: 'Url Shortener',
  appVersion: process.env.APP_VERSION || 'localhost',
  cryptographPasswordSalt: Number(process.env.CRYPTOGRAPH_PASSWORD_SALTS),
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  accessTokenTime: Number(process.env.ACCESS_TOKEN_TIME_SECONDS),
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  refreshTokenTime: Number(process.env.REFRESH_TOKEN_TIME_SECONDS),
  baseUrlShortener: process.env.BASE_URL_SHORT,
});
