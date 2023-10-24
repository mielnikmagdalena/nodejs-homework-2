import { listContacts } from "../../models/contacts.js";
export async function indexContacts(req, res, next) {
  const contacts = await listContacts();
  return res.json(contacts);
}
