import express from "express";
import Joi from "joi";
import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} from "../../models/contacts.js";

const router = express.Router();

router.get("/", (req, res, next) => {
  const contacts = listContacts();
  res.json(contacts);
});

router.get("/:contactId", (req, res, next) => {
  const contactId = req.params.contactId;
  const contact = getContactById(contactId);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", (req, res, next) => {
  const { name, email, phone } = req.body;

  // Walidacja danych wejściowych
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });

  const { error } = schema.validate({ name, email, phone });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const newContact = addContact({ name, email, phone });
  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const isRemoved = removeContact(contactId);

  if (isRemoved) {
    res.json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", (req, res, next) => {
  const contactId = req.params.contactId;
  const { name, email, phone } = req.body;

  // Walidacja danych wejściowych
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
  });

  const { error } = schema.validate({ name, email, phone });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const updatedContact = updateContact(contactId, { name, email, phone });

  if (updatedContact) {
    res.json(updatedContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

export default router;
