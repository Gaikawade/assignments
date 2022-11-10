exports.errorHandler = (err, req, res) => {
  res.status(500).json({error: err.message || err});
}