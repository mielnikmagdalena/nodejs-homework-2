import { removeContact } from "../../models/contacts.js";
export async function deleteContacts(req, res, next) {
  const contactId = req.params.contactId;
  const isRemoved = removeContact(contactId);

  if (isRemoved) {
    return res.json({ message: "contact deleted" });
  } else {
    return res.status(404).json({ message: "Not found" });
  }
}
