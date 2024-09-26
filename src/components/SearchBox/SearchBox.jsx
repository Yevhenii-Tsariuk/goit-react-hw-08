import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filtersSlice";
import { selectNameFilter } from "../../redux/selectors";
import { useId } from "react";
import css from "./SearchBox.module.css";

export default function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);
  const inputId = useId();
  const onChange = (evt) => {
    dispatch(changeFilter(evt.target.value));
  };
  return (
    <div className={css.container}>
      <p>Find contacts by name</p>
      <input
        className={css.input}
        type="text"
        value={filter}
        id={inputId}
        onChange={onChange}
      />
    </div>
  );
}
