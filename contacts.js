const { nanoid } = require('nanoid');
const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const contact = contacts.find(c => c.id === contactId.toString());
    return contact || 'No such contact';
}

const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(c => c.id === contactId.toString());
    if (idx === -1) return 'No such contact';
    const contact = contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contact[0];
}

const addContact = async (name, email, phone) => {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}