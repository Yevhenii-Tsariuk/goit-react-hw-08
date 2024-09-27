import { FaPhone } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import css from "./Contact.module.css";

export default function Contact({ contact }) {
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(deleteContact(contact.id));

  return (
    <div className={css.contact}>
      <ul>
        <li className={css.item}>
          <IoPersonSharp />
          <p>{contact.name}</p>
        </li>
        <li className={css.item}>
          <FaPhone />
          <p> {contact.number}</p>
        </li>
      </ul>

      <button className={css.button} type="button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
