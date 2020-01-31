const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')
const helpService = require('./data/helpService')

config.plugins.push(new webpack.HotModuleReplacementPlugin())

const shouldFail = () => Math.floor(Math.random() * 10) < 2

const registerEndpoints = (app) => {
  app.get('/api/question', (req, res) => {
    setTimeout(() => {
      if (shouldFail()) {
        res.status(500).send({
          message: 'Something goes wrong, please try again!'
        })
      } else {
        res.send(helpService.getQuestion())
      }
    }, 10000)
  })

  app.get('/api/answer', (req, res) => {
    setTimeout(() => {
      res.send(helpService.getAnswer())
    }, 10000)
  })
}

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  watchContentBase: true,
  hot: true,
  inline: true,
  historyApiFallback: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
  before: registerEndpoints
}).listen(4000, '0.0.0.0', function (err) {
  if (err) {
    console.log(err)
  }

  console.log('Listening at http://0.0.0.0:4000')
})
