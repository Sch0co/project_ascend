const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', //server 의 api path
    createProxyMiddleware({
      target: 'http://Montap-env.eba-fnbxy2ap.ap-northeast-2.elasticbeanstalk.com', // server 주소
      changeOrigin: true,
      secure: false
    })
  );
};