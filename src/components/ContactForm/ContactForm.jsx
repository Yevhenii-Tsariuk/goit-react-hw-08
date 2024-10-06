import css from "./ContactForm.module.css";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function ContactForm() {
  const dispatch = useDispatch();

  const ContactFormSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
      number: Yup.string()
      .matches(/^\d{3}-\d{2}-\d{2}$/, "Must be XXX-XX-XX")
      .required("Required"),
  });

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));
    actions.resetForm();
  };

  const initialValues = {
    name: "",
    number: "",
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={ContactFormSchema}
      >
        <Form className={css.container}>
          <label htmlFor="name" className={css.label}>
            Name
          </label>
          <Field type="text" name="name" id="name" className={css.input} />
          <ErrorMessage
            name="name"
            component="span"
            className={css.errorMessage}
          />
          <label htmlFor="name" className={css.label}>
            Number
          </label>
          <Field type="phone" name="number" id="name" className={css.input} />
          <ErrorMessage
            name="number"
            component="span"
            className={css.errorMessage}
          />
          <button type="submit" className={css.button}>
            Add contact
          </button>
        </Form>
      </Formik>
    </div>
  );
}
