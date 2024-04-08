 const handleRequest = (requestHandler) => async (req, res, next) => {
  try {
    const data = await requestHandler(req);
    return res.status(data.status).json(data.body);
  } catch (error) {
    next(error);
  }
}

 module.exports = { handleRequest }