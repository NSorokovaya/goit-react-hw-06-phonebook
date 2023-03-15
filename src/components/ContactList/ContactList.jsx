import { useSelector, useDispatch } from "react-redux";

import { removeContact } from "../../redux/contactSlice";

import contactSelector from '../../redux/selector';
import css from './ContactList.module.css';
const ContactList = () => {
  const contacts = useSelector(contactSelector.getFilteredContacts);
  const dispatch = useDispatch();

  const onDeleteContact = (id) => {
    dispatch(removeContact(id));
  }
return (
    <ul className={css.list}>
      {
        contacts.map((contact) => (
          <li className={css.name} key={contact.id}>
            <span>{contact.name}: {contact.number}</span>
            <button className={css.btn} onClick={() => onDeleteContact(contact.id)}>Delete</button>
          </li>
        ))
      }
    </ul>
  );
}

export default ContactList;

