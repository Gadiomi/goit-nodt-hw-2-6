const express = require("express");
const ctrl = require("../../controllers/contacts");

const router = express.Router();

const { validateBody } = require("../../middleware/validateBody");
const addSchema = require("../../shemas/contacts");

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(addSchema.addShema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", validateBody(addSchema.addShema), ctrl.updateContact);

module.exports = router;
