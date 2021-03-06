const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const { NODE_ENV } = require('../config/env');
const config = require('../client/webpack')(NODE_ENV);

const compiler = webpack(config);

async function webpackProdMiddleware(req, res, next) {

  try {
    if (!res.app.get('webpackStats')) {

      console.log('webpack: building');

      const webpackStats = await new Promise((resolve, reject) => {

        compiler.run((err, stats) => {

          if (err) {

            reject(err);
            return;
          }

          resolve(stats.toJson({
            all: false,
            assets: true,
            assetsSort: 'name',
            entrypoints: true,
            errorDetails: true,
            errors: true,
            logging: 'warn',
            performance: true,
            warnings: true,
          }));
        });
      });
      req.app.set('webpackStats', webpackStats);
    }
    next();
  }
  catch (err) {
    next(err);
  }
}

module.exports = 'production' !== NODE_ENV ? webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  serverSideRender: true,
  stats: 'minimal',
  writeToDisk: false,
}) : webpackProdMiddleware;