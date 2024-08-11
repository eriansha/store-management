import { forwardRef, useId } from 'react'

type ButtonProps = {
  className?: string,
  label?: string,
  placeholder?: string,
  errorText?: React.ReactNode
} & React.ComponentPropsWithRef<'input'>


const InputField = forwardRef<HTMLInputElement, ButtonProps>(
  (
    {
      children,
      label,
      placeholder,
      className,
      errorText,
      ...props
    },
    ref
  ) => {
    const inputId = useId()

    return (
      <div className='flex flex-col mb-4 text-sm'>
        {
          label && (
            <label
              htmlFor={inputId}
              className='block mb-2 text-sm font-medium text-gray-700'
            >
              {label}
            </label>
          )
        }
        <input
          id={inputId}
          ref={ref}
          className="flex justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          placeholder={placeholder}
          {...props}
        />

        {errorText}
      </div>
    )
  }
)

InputField.displayName = "InputField"

export default InputField
