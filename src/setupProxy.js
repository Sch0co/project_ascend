const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', //server 의 api path
    createProxyMiddleware({
      target: 'http://13.125.114.8:3306', // server 주소
      changeOrigin: true,
      secure: false
    })
  );
};