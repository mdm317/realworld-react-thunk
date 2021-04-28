import React, { useState } from "react";

interface TextAreaProp {
  value?: string;

  id?: string;
  className?: string;
  rows?: number;
  placeholder?: string;
  required?: boolean;
}
export default function TextArea({
  value,
  id,
  className,
  rows,
  placeholder,
  required,
}: TextAreaProp): JSX.Element {
  const [_value, setvalue] = useState(value);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setvalue((e.target as HTMLTextAreaElement).value);
  };
  return (
    <textarea
      onChange={handleChange}
      value={_value}
      id={id}
      className={className}
      rows={rows}
      placeholder={placeholder}
      required={required}
    ></textarea>
  );
}
