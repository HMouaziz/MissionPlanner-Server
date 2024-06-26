const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  create,
  update,
  remove,
} = require("../controllers/typesController");

const {verifyRequest} = require("../middleware/authMiddleware");

router.use(verifyRequest)

router.route("/")
  .get(getAll)
  .post(create);

router.route("/:id")
  .get(getById)
  .put(update)
  .delete(remove);

module.exports = router;
