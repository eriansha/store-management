import { forwardRef, useId } from 'react'

type ButtonProps = {
  className?: string,
  label?: string,
  placeholder?: string,
} & React.ComponentPropsWithRef<'input'>;


const InputField = forwardRef<HTMLInputElement, ButtonProps>(
  (
    {
      children,
      label,
      placeholder,
      className,
      ...props
    },
    ref
  ) => {
    const inputId = useId()

    return (
      <div className='flex flex-col'>
        {
          label && (
            <label
              htmlFor={inputId}
              className='font-medium'
            >
              {label}
            </label>
          )
        }
        <div className='border border-grey-300 rounded-md'>
          <input
            id={inputId}
            ref={ref}
            className='py-4 px-2'
            placeholder={placeholder}
            {...props}
          />
        </div>
      </div>
    );
  }
);

InputField.displayName = "InputField"

export default InputField;
