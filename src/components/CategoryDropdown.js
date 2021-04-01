import { useDispatch } from "react-redux";
import Select from "react-select";
import { SET_CATEGORY } from "../redux/constants";

export const CategoryDropDown = ({categories = [], onSelect = () => {}}) => {
  const dispatch = useDispatch();
  const handleChange = selectedOption => {
    const category = categories.filter(c => c.id === selectedOption.value)[0];
    dispatch({ type: SET_CATEGORY, category });
  };

  if (categories.length === 0) {
    return null;
  }

  const options = [{value: 0, label: "All"}, ...categories.map(c => {
    return { value: c.id, label: c.name };
  })];

  return (
    <div className="text-left">
      <label className="d-block">Select a Category</label>
      <Select
        defaultValue={options[0]}
        onChange={handleChange}
        options={options}
      />
    </div>
  );
};
