const contactsApi = require('./db');
const { Command } = require("commander");

const program = new Command();

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "list":
            const contacts = await contactsApi.listContacts();
            console.log(contacts);
            break;

        case "get":
            const contact = await contactsApi.getContactById(id);
            console.log(contact);
            break;

        case "add":
            const newContact = await contactsApi.addContact(name, email, phone);
            console.log(newContact);
            break;

        case "remove":
            const deletedContact = await contactsApi.removeContact(id);
            console.log(deletedContact);
            break;

        case "update":
            const updatedContact = await contactsApi.updateContact(id, { name, email, phone });
            console.log(updatedContact);
            break;

        default:
            console.warn("Unknown action type!");
    }
}

invokeAction(argv);