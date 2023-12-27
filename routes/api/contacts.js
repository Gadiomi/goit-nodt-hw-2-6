const express = require("express");
const ctrl = require("../../controllers/contacts");
const validateBody = require("../../middleware/validateBody");
const { schema } = require("../../models/contact");
const isEmptyBody = require("../../middleware/isEmptyBody");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:id", isEmptyBody, ctrl.getContactById);

router.post("/", validateBody(schema.addSchema), ctrl.addContact);

router.delete("/:id", isEmptyBody, ctrl.deleteContactById);

router.put(
  "/:id",
  isEmptyBody,
  validateBody(schema.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:id/favorite",
  isEmptyBody,
  validateBody(schema.updateFavorite),
  ctrl.updateFavorite
);

module.exports = router;
