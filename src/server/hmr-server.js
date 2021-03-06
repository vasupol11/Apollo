/* eslint-disable no-console */

import path from 'path'

import chalk from 'chalk'
import config from 'config'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import webpackConfig from '../../webpack.config.dev.babel.js'

const app = express()

const compiler = webpack(webpackConfig)

app.use(express.static(path.join(process.cwd(), 'static')))

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  path: '/__webpack_hmr',
  publicPath: webpackConfig.output.publicPath,
}))
app.use(webpackHotMiddleware(compiler))

app.listen(config.wds.port, err => {
  const serverName = chalk.bgBlue.bold(' HMR Server ')
  const url = chalk.yellow(`${config.wds.host}:${config.wds.port}`)

  console.log()
  console.log(err || `${serverName} listening on ${url}`)
  console.log()
})
