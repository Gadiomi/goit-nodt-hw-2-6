const contacts = require("../models/contacts");
const { HttpError, contWrapper } = require("../helpers");

const listContacts = async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const addContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  if (!result) {
    throw HttpError(400);
  }
  res.status(201).json(result[result.length - 1]);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  return res.status(200).json({
    message: "contact deleted",
  });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  if (!req.body || Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing fields");
  }

  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(400, "Not found");
  }
  const [updatedContact] = result;
  res.status(200).json(updatedContact);
};

module.exports = {
  listContacts: contWrapper(listContacts),
  addContact: contWrapper(addContact),
  getContactById: contWrapper(getContactById),
  removeContact: contWrapper(removeContact),
  updateContact: contWrapper(updateContact),
};
