import React from "react";

interface Props {
  isChecked: boolean;
  name: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const Checkbox = (props: Props) => {
  return (
    <div>
      <input
        type="checkbox"
        name={props.name}
        id={props.label}
        checked={props.isChecked}
        onChange={props.handleChange}
      />
    </div>
  );
};
export default Checkbox;
