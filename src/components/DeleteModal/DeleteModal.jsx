import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { selectDelModalIsOpen } from "../../redux/modal/selectors";
import { setDelModal } from "../../redux/modal/slice";
import { selectCurrentContact } from "../../redux/contacts/selectors";
import { deleteContact } from "../../redux/contacts/operations";
import css from "./DeleteModal.module.css";
import toast from "react-hot-toast";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "rgba(95, 97, 133, 0.5)"
  },
};

Modal.setAppElement("#root");

export default function DelModal() {
  const delModalIsOpen = useSelector(selectDelModalIsOpen);

  const contact = useSelector(selectCurrentContact);
  const dispatch = useDispatch();

  function closeModal() {
    dispatch(setDelModal(false));
  }
  function handleDelete() {
    dispatch(deleteContact(contact.id));
    dispatch(setDelModal(false));
    toast("The contact is deleted", {
      duration: 2000,
      position: "top-center",
      style: {
        background: "green",
        color: "white",
      },
    });
  }
  return (
    <div>
      <Modal
        isOpen={delModalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
       
        <h2 className={css.title}>Please confirm delete</h2>
        <button onClick={handleDelete} className={css.deleteBtn}>
          Delete
        </button>
        <button onClick={closeModal}>Cancel</button>
      </Modal>
    </div>
  );
}