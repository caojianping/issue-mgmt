/***
 * @file:
 * @author: caojianping
 * @Date: 2021-01-16 10:40:04
 */
module.exports = {
  apps: [
    {
      name: 'issue-mgmt-service',
      script: './dist/app.js',
      watch: true,
      watch_ignore: ['./node_modules', './logs'],
      // 开发环境
      env_development: {
        NODE_ENV: 'development',
        NODE_APP_INSTANCE: 'development',
      },
      // 测试环境
      env_test: {
        NODE_ENV: 'test',
        NODE_APP_INSTANCE: 'test',
      },
      // 生产环境
      env_production: {
        NODE_ENV: 'production',
        NODE_APP_INSTANCE: 'production',
      },
    },
  ],
};
