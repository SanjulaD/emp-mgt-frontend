import React from 'react';
import { useController, type Control } from 'react-hook-form';

interface InputFieldProps {
  name: string;
  control: Control<any>;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  as?: 'input' | 'select';
  children?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  control,
  label,
  type = 'text',
  required = false,
  as = 'input',
  placeholder = '',
  children,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div className="space-y-2">
      <label className="block">{label}</label>
      {as === 'select' ? (
        <select
          {...field}
          className={`w-full border px-4 py-2 ${error ? 'border-red-500' : 'border-gray-300'}`}
          required={required}
        >
          {children}
        </select>
      ) : (
        <input
          {...field}
          type={type}
          className={`w-full border px-4 py-2 ${error ? 'border-red-500' : 'border-gray-300'}`}
          required={required}
          placeholder={placeholder}
        />
      )}
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
};

export default InputField;
