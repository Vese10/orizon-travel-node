function errorHandler(controllerFunction) {
  return async (req, res, next) => {
    try {
      await controllerFunction(req, res, next);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}

module.exports = errorHandler