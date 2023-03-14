//import React, { Component } from 'react';
import { useState, useEffect } from 'react';

import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
// class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],

//     filter: '',
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);
//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }
  export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contactList')) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contactList', JSON.stringify(contacts));
  }, [contacts]);

  const submitFormData = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    for (const contact of contacts) {
      if (contact.name === name) {
        return Notify.failure(`${name} is already in contacts.`);
      }
    }

        setContacts(prev => [newContact, ...prev]);

  };

  const filtered = e => {
        setFilter(e.currentTarget.value);

  };

 const visibleContact = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };


  const deleteContact = id => {
    setContacts(contacts.filter(el => el.id !== id));
    };
    
return (
    <div className="thumb">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={submitFormData} data={contacts} />
      <h2>Contacts</h2>
      <Filter value={filter} filter={filtered} />
      <ContactList contacts={visibleContact()} deleteContact={deleteContact} />
    </div>
  );
}


export default App;
