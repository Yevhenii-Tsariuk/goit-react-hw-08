import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { selectModalIsOpen } from "../../redux/modal/selectors";
import { setModal } from "../../redux/modal/slice";
import css from "./EditModal.module.css";
import EditForm from "../EditForm/EditForm";
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

export default function EditModal() {
  const modalIsOpen = useSelector(selectModalIsOpen);

  const dispatch = useDispatch();

  function closeModal() {
    dispatch(setModal(false));
  }
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2 className={css.subtitle}>Edit contact</h2>
        <EditForm />
      </Modal>
    </div>
  );
}