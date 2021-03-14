import React, { useState } from 'react';
import Select from 'react-select';

export const CategoryDropDown = ({categories, onSelect = () => {}}) => {
  const [selected, setSelected] = useState(0);
  const handleChange = selectedOption => {
    setSelected(selectedOption);
    console.log(`Option selected:`, selectedOption);
    onSelect(categories.filter(c => c.id === selectedOption.value)[0].id);
  };
  const options = [{value: 0, label: "All"}, ...categories.map(c => {
    return { value: c.id, label: c.name };
  })];

  return (
    <Select
      label="Select a Category"
      value={selected}
      onChange={handleChange}
      options={options}
    />
  );
};
