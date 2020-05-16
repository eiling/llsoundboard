if (process.env.LLSOUNDBOARD_ENV === 'dev') {
  module.exports = {
    publicPath: '/'
  }
} else {
  module.exports = {
    publicPath: '/llsoundboard/'
  }
}