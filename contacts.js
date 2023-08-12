import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'path';
import { nanoid } from 'nanoid';

const contactsPath = join('db', 'contacts.json');

export function listContacts() {
  readFile(contactsPath)
    .then(data => console.table(JSON.parse(data)))
    .catch(err => console.log(err.message));
}

export function getContactById(contactId) {
  readFile(contactsPath)
    .then(data => JSON.parse(data))
    .then(contacts => contacts.find(contact => contact.id === contactId))
    .then(contact => {
      if (!contact) {
        console.log(`There is no contact with id of ${contactId}`);
        return;
      }
      console.log(contact);
    })
    .catch(err => console.log(err.message));
}

export function removeContact(contactId) {
  readFile(contactsPath)
    .then(data => JSON.parse(data))
    .then(contacts => {
      const foundContact = contacts.findIndex(
        contact => contact.id === contactId,
      );
      if (foundContact === -1) {
        return console.log(`There is no contact with id of ${contactId}`);
      }
      const newContactsList = contacts.filter(
        contact => contact.id !== contactId,
      );
      writeFile(contactsPath, JSON.stringify(newContactsList));
      console.log('Succesfully removed contact!');
    })
    .catch(err => console.log(err.message));
}

export function addContact(name, email, phone) {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  readFile(contactsPath)
    .then(data => JSON.parse(data))
    .then(contacts => {
      const newContactsList = [...contacts, newContact];
      writeFile(contactsPath, JSON.stringify(newContactsList));
      console.log('Succesfully added contact!');
    })
    .catch(err => console.log(err.message));
}
