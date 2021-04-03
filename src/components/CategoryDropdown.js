import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { SET_CATEGORY } from "../redux/constants";

const categoryToOption = (c) => {
  return { value: c.id, label: c.name };
};

export const CategoryDropDown = ({categories = [] }) => {
  const dispatch = useDispatch();
  const handleChange = selectedOption => {
    const cat = categories.find(c => c.id === selectedOption.value);
    dispatch({ type: SET_CATEGORY, category: cat });
  };
  const category = useSelector(state => state.base.category);
  console.log(category);

  if (categories.length === 0) {
    return null;
  }

  const options = [{value: 0, label: "All"}, ...categories.map(categoryToOption)];

  return (
    <div className="text-left">
      <label className="d-block">Select a Category</label>
      <Select
        defaultValue={category ? categoryToOption(category) : options[0]}
        onChange={handleChange}
        options={options}
      />
    </div>
  );
};
