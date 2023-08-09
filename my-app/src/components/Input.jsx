import { memo, forwardRef } from "react";

const Input = (
  { name, label, type = "text", errorMessage = "", onChange },
  ref
) => {
  return (
    <div>
      <label style={{ display: "block" }} htmlFor={name}>
        {label}
      </label>
      <input id={name} name={name} type={type} onChange={onChange} ref={ref} />
      <span>{errorMessage}</span>
    </div>
  );
};

export default memo(forwardRef(Input));
