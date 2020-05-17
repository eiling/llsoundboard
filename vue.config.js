if (process.env.NODE_ENV === 'production') {
  module.exports = {
    publicPath: '/llsoundboard/',
  }
} else {
  module.exports = {
    publicPath: '/',
  }
}