const ApiError = require('../error/ApiError')

module.exports = function (err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message })
  }
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    try {
      JSON.parse(err.body)
    } catch (e) {
      return res.status(err.status).json({
        message: e.message,
      })
    }
  }
  return res.status(500).json({ message: 'Unexpected error' })
}
