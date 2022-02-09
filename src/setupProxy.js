const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/',
    createProxyMiddleware({
      target: 'https://sewa-aula-server.herokuapp.com/',
      changeOrigin: true,
    })
  );
};