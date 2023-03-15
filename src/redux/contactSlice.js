import { createSlice } from '@reduxjs/toolkit';

const INITIAL_CONTACT_STATE = {
  items: [],
  filter: '',
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState: INITIAL_CONTACT_STATE,

  reducers: {
    addContact(state, { payload: newContact }) {
      state.items.push(newContact);
    },

    removeContact(state, { payload: id }) {
      state.items = state.items.filter(el => el.id !== id);
    },

    setInitialItems(state, { payload: items }) {
      return {
        ...state,
        items,
      };
    },

    changeFilter(state, { payload: filterValue }) {
      return {
        ...state,
        filter: filterValue,
      };
    },
  },
});

export const { addContact, removeContact, changeFilter, setInitialItems } =
  contactSlice.actions;

export default contactSlice.reducer;
