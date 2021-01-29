import React, { useState } from "react";

interface InputProp {
  placeholder?: string;
  required?: boolean;
  value?: string;
  id?: string;
  type?: string;
  className?: string;
}
export default function Input({
  placeholder,
  required,
  value = "",
  id,
  type,
  className,
}: InputProp): JSX.Element {
  const [_value, setvalue] = useState(value);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setvalue((event.target as HTMLInputElement).value);
  };
  return (
    <input
      placeholder={placeholder}
      required={required}
      value={_value}
      onChange={handleChange}
      id={id}
      type={type}
      className={className}
    ></input>
  );
}
