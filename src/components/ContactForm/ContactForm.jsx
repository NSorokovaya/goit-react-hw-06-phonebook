import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import css from './ContactForm.module.css';

import contactSelector from '../../redux/selector';

import { addContact } from "../../redux/contactSlice";

import { nanoid } from "nanoid";


const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    number: ''
  });

  const contacts = useSelector(contactSelector.getContact);
  const dispatch = useDispatch();

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) return phoneNumber;

    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }

    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  }

  const isTheSameNameInCollection = (name) => {
    return contacts.some((contact) => contact.name.trim().toLowerCase() === name.toLowerCase().trim());
  }

  const onAddContact = () => {
    if (formData.name.length <= 0) {
      alert(`The length should me greater than 0 symbols`);
      return null;
    }

    if (isTheSameNameInCollection(formData.name)) {
      alert(`${formData.name} is already in contacts`);
      return null;
    }

    const newContact = {
      ...formData,
      id: nanoid()
    }

    dispatch(addContact(newContact));
  }

  const onChange = (event) => {
    const { value, name } = event.target;

    if (name === 'number') {
      setFormData({...formData, [name]: formatPhoneNumber(value) });
      return null;
    }

    setFormData({...formData, [name]: value });
  }

   return (
    <form  className={css.contactForm}>
      <label>
        Name <br />
        <input
          className={css.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={formData.name}
          onChange={onChange}
        />
      </label>
      <br />
      <label>
        Number <br />
        <input
          className={css.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={formData.number}
          onChange={onChange}
        />
      </label>
      <br />
      <button className={css.btn} onClick={onAddContact}>
        Add contact
      </button>
    </form>
  );
}

export default ContactForm;
