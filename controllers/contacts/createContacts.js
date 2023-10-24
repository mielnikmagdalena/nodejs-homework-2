import { addContact } from "../../models/contacts.js";
export async function createContacts(req, res, next) {
  const { name, email, phone } = req.body;

  const { error } = requiredSchema.validate({ name, email, phone });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const newContact = addContact({ name, email, phone });
  return res.status(201).json(newContact);
}
