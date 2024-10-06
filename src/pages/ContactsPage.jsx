import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ContactForm from "../components/ContactForm/ContactForm";
import ContactList from "../components/ContactList/ContactList";
import SearchBox from "../components/SearchBox/SearchBox";
import PageTitle from "../components/PageTitle/PageTitle";

import { fetchContacts } from "../redux/contacts/operations";
import { selectLoading } from "../redux/contacts/selectors";

import { selectDelModalIsOpen, selectModalIsOpen, } from "../redux/modal/selectors";
import EditModal from "../components/EditModal/EditModal";
import DeleteModal from "../components/DeleteModal/DeleteModal";

export default function ContactsPage() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const modalIsOpen = useSelector(selectModalIsOpen);
  const delModalIsOpen = useSelector(selectDelModalIsOpen);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <PageTitle>Your contacts</PageTitle>
      <ContactForm />
      <SearchBox />
      <div>{loading && "Request in progress..."}</div>
      <ContactList />
      {modalIsOpen && <EditModal />}
      {delModalIsOpen && <DeleteModal />}
    </div>
  );
}
