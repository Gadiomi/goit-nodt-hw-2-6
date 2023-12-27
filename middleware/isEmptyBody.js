const { isValidObjectId } = require("mongoose");
const HttpError = require("../helpers/HttpError");

const isEmptyBody = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(HttpError(500, `${id} is not valid id`));
  }
  next();
};

module.exports = isEmptyBody;
