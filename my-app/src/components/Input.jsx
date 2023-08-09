import { memo } from "react";

const Input = ({ name, label, type = "text", errorMessage = "", onChange }) => {
  return (
    <div>
      <label style={{ display: "block" }} htmlFor={name}>
        {label}
      </label>
      <input id={name} name={name} type={type} onChange={onChange} />
      <span>{errorMessage}</span>
    </div>
  );
};

export default memo(Input);
