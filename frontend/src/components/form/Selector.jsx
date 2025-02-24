import React from "react";

const Selector = ({
  options,
  name,
  value,
  updateValue,
  label,
  type,
  style,
  className
}) => {
  const inputChangeHandler = (event) => {
    updateValue(event.target.name, event.target.value, event.target.type);
  };

  return (
    <div className={`flex flex-col m-1 ${className}`}>
      <label className="text-left text-[#4b5563]" htmlFor={`${name}-select`}>
        {label}
      </label>
      <select
        type={type}
        name={name}
        id={`${name}-select`}
        value={value}
        style={style}
        onChange={inputChangeHandler}
        className="w-full py-[8px] px-2 border border-1 rounded-lg "
      >
        {options &&
          options.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Selector;
