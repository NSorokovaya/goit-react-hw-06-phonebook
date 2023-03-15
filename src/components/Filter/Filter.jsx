import css from './Filter.module.css';
import { useDispatch } from 'react-redux';
import {
  changeFilter,
} from "../../redux/contactSlice"



const Filter = () => {
  const dispatch = useDispatch();

  const onChangeFilter = (event) => {
    const { value: newSearchValue } = event.target;
    dispatch(changeFilter(newSearchValue));
  }

  return (
    <div className={css.filter}>
      <label>Find Contacts by name</label>
      <input
        id="contact-search-field"
        type="text"
        name="search-field"
        className={css.input}
        title="Filter Value"
        onChange={onChangeFilter}
      />
    </div>
  )
}

export default Filter;


