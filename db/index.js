const path = require('path');
const fs = require('fs/promises');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

const updateContacts = async (contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf8');
  return JSON.parse(data);
}

const getContactById = async (id) => {
  const contacts = await listContacts();
  const contact = contacts.find(c => c.id === id.toString());
  return contact || null;
}

const removeContact = async (id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(c => c.id === id.toString());
  if (idx === -1) return null;
  const [contact] = contacts.splice(idx, 1);
  await updateContacts(contacts);
  return contact;
}

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone: phone.toString()
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

const updateContact = async (id, { name, email, phone }) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(c => c.id === id.toString());
  if (idx === -1) return null;
  contacts[idx] = {
    id: id.toString(),
    name,
    email,
    phone: phone.toString()
  };
  await updateContacts(contacts);
  return contacts[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}