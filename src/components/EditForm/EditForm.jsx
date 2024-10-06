import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { ErrorMessage } from "formik";
import css from "./EditForm.module.css";
import { setModal } from "../../redux/modal/slice";
import { editContact } from "../../redux/contacts/operations";
import toast from "react-hot-toast";
import { selectCurrentContact } from "../../redux/contacts/selectors";

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{2}$/, "Must be XXX-XX-XX")
    .required("Required"),
});

export default function EditForm() {
  const contact = useSelector(selectCurrentContact);
  const initialValues = {
    name: contact.name,
    number: contact.number,
  };
  const dispatch = useDispatch();
  const nameFieldId = useId();
  const numberFieldId = useId();

  const handleSubmit = (values, actions) => {
    dispatch(editContact({ ...values, id: contact.id }));
    dispatch(setModal(false));
    toast(`The contact has been updated`, {
      duration: 4000,
      position: "top-center",
      style: {
        background: "green",
        color: "white",
      },
    });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={css.form}>
        <div className={css.inputWrap}>
          <label className={css.label} htmlFor={nameFieldId}>
            Name
          </label>
          <Field
            className={css.input}
            type="text"
            name="name"
            id={nameFieldId}
          />
          <ErrorMessage className={css.error} name="name" component="span" />
        </div>
        <div className={css.inputWrap}>
          <label className={css.label} htmlFor={numberFieldId}>
            Number
          </label>
          <Field
            className={css.input}
            type="text"
            name="number"
            id={numberFieldId}
          />
          <ErrorMessage className={css.error} name="number" component="span" />
        </div>
        <button className={css.button} type="submit">
          Save
        </button>
      </Form>
    </Formik>
  );
}