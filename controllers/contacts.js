const addShema = require("../shemas/contacts");

const contacts = require("../models/contacts");
const { HttpError, contWrapper } = require("../helpers");

const listContacts = async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "not found contacts");
  }
  res.status(200).json(result);
};

const addContact = async (req, res, next) => {
  const { error } = addShema.addShema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
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

const updateContact = async (req, res, next) => {
  const { error } = addShema.addShema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = {
  listContacts: contWrapper(listContacts),
  addContact: contWrapper(addContact),
  getContactById: contWrapper(getContactById),
  removeContact: contWrapper(removeContact),
  updateContact: contWrapper(updateContact),
};
