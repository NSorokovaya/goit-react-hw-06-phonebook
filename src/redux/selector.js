const contactSelectore = {
  getContact: state => state.contacts.items,
  getFilter: state => state.contacts.filter,
  getFilteredContacts: state => {
    return state.contacts.items.filter(contact =>
      contact.name.toLowerCase().includes(state.contacts.filter.toLowerCase())
    );
  },
};

export default contactSelectore;
