import React from "react";

interface TextInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  name: string;
  onChange?: (value: string) => void;
  errors?: any;
  register: any;
}

const TextInput = (props: TextInputProps) => {
  const { register, errors, name, label, placeholder, type } = props;

  const hasError: boolean = errors?.[name];

  console.log("errors", errors);

  return (
    <div className="mb-3">
      <label
        htmlFor="nombres"
        className={`form-label small ${hasError ? "text-danger" : ""}`}
      >
        {label}
      </label>
      <input
        {...register(name)}
        type={type ?? "text"}
        className={`form-control ${hasError ? "border-danger" : ""}`}
        id="nombres"
        placeholder={placeholder}
      />
      {errors?.[name] && (
        <p className="errorMessage">{errors?.[name].message}</p>
      )}
    </div>
  );
};

export default TextInput;
