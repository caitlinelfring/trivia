import Select from 'react-select';

export const CategoryDropDown = ({categories = [], onSelect = () => {}}) => {
  const handleChange = selectedOption => {
    const selected = categories.filter(c => c.id === selectedOption.value)[0];
    onSelect(selected.id || 0);
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
