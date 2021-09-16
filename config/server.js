module.exports = ({ env }) => ({
  host: '127.0.0.1',
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '487f5fe453ba9c42527055c0e5443c2e'),
    },
  },
  url: 'http://apí.inovatruck.com.br',
});
