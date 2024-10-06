import { FaPhone } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import css from "./Contact.module.css";
import { setDelModal, setModal } from "../../redux/modal/slice";
import { changeCurrentContact } from "../../redux/contacts/slice";

export default function Contact({ contact }) {
  const dispatch = useDispatch();
  
  function onDelete() {
    dispatch(setDelModal(true));
    dispatch(changeCurrentContact(contact));
  }

  function onEdit(contact) {
    dispatch(setModal(true));
    dispatch(changeCurrentContact(contact));
  }

  return (
    <div className={css.contact}>
      <ul className={css.list}>
        <li className={css.item}>
          <IoPersonSharp />
          <p>{contact.name}</p>
        </li>
        <li className={css.item}>
          <FaPhone />
          <p> {contact.number}</p>
        </li>
      </ul>
      <div className={css.containerForBtn}>
        <button
          className={css.button}
          type="button"
          onClick={() => onEdit(contact)}
        >
          Edit
        </button>
  
        <button
          className={css.button}
          type="button"
          onClick={() => onDelete(contact.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
