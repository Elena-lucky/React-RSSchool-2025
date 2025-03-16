import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  placeholder?: string;
  isError?: boolean;
  errorMessage?: string;
}

export const InputComponent = forwardRef<HTMLInputElement, InputProps>(
  (
    { id, label, placeholder, isError, errorMessage, value, onChange, ...rest },
    ref
  ) => {
    return (
      <div>
        <label htmlFor={id}>
          <input
            id={id}
            className="input"
            autoComplete="off"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            ref={ref}
            {...rest}
          />
          <span>{label}</span>
        </label>
        {isError && <span>{errorMessage}</span>}
      </div>
    );
  }
);

InputComponent.displayName = 'InputComponent';
