/* eslint-disable no-unused-expressions */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.REACT_APP_API_HOST || 'http://localhost:27238',
      changeOrigin: true,
    })
  ),
    app.use(
      '/swagger',
      createProxyMiddleware({
        target: process.env.REACT_APP_API_HOST || 'http://localhost:27238',
        changeOrigin: true,
      })
    ),
    app.use(
      '/twm/api',
      createProxyMiddleware({
        target: process.env.REACT_APP_API_HOST || 'http://localhost:27238',
        changeOrigin: true,
        pathRewrite: {
          '^/twm/': '/',
        },
      })
    ),
    app.use(
      '/ogs-internal',
      createProxyMiddleware({
        target: 'http://vip-dev-geo.th.gov.bc.ca:8081/ogs-geoV06/',
        pathRewrite: {
          '^/ogs-internal/': '/',
        },
        changeOrigin: true,
      })
    ),
    app.use(
      '/twm',
      createProxyMiddleware({
        target: 'http://localhost:5500',
        changeOrigin: true,
        pathRewrite: {
          '^/twm/': '/',
        },
      })
    );
};
