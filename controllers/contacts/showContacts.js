import { getContactById } from "../../models/contacts.js";
export async function showContacts(req, res, next) {
  const contactId = req.params.contactId;
  const contact = getContactById(contactId);

  if (contact) {
    return res.json(contact);
  } else {
    return res.status(404).json({ message: "Not found" });
  }
}
