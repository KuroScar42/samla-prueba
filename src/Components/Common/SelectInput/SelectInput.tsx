import React from "react";

interface SelectInputProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  onChange?: (value: string) => void;
  placeholder?: string;
  errors?: any;
  register: any;
}

const SelectInput = (props: SelectInputProps) => {
  const { register, errors, name, label, options, placeholder } = props;

  const hasError: boolean = errors?.[name];

  return (
    <div className="mb-3">
      <label
        htmlFor={name}
        className={`form-label small ${hasError ? "text-danger" : ""}`}
      >
        {label}
      </label>
      <select
        {...register(name)}
        className={`form-control ${hasError ? "border-danger" : ""}`}
        id={name}
      >
        <option value="">{placeholder ?? "Seleccione una opcion"}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors?.[name] && (
        <p className="errorMessage">{errors?.[name].message}</p>
      )}
    </div>
  );
};

export default SelectInput;
