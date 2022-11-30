const contactsApi = require('./contacts');
const argv = require("yargs").argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contactsApi.listContacts()
        .then(data => console.log(data))
        .catch(err => console.log(err.message));
      break;

    case "get":
      contactsApi.getContactById(id)
        .then(data => console.log(data))
        .catch(err => console.log(err.message));
      break;

    case "add":
      contactsApi.addContact(name, email, phone)
        .then(data => console.log(data))
        .catch(err => console.log(err.message));
      break;

    case "remove":
      contactsApi.removeContact(id)
        .then(data => console.log(data))
        .catch(err => console.log(err.message));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);