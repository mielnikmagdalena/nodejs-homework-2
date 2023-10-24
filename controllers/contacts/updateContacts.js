import { updateContact } from "../../models/contacts.js";
export async function updateContacts(req, res, next) {
  const contactId = req.params.contactId;
  const { name, email, phone } = req.body;

  const { error } = optionalSchema.validate({ name, email, phone });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const updatedContact = updateContact(contactId, { name, email, phone });

  if (updatedContact) {
    return res.json(updatedContact);
  } else {
    return res.status(404).json({ message: "Not found" });
  }
}
