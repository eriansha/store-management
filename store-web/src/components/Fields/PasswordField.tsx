import { forwardRef, useId, useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

type ButtonProps = {
  className?: string,
  label?: string,
  placeholder?: string,
} & React.ComponentPropsWithRef<'input'>;


const PasswordField = forwardRef<HTMLInputElement, ButtonProps>(
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
    const [isShowPassword, setIsShowPassword] = useState(false)

    const handleToggleType = () => {
      setIsShowPassword(!isShowPassword)
    }
    const inputId = useId()

    return (
      <div className='flex flex-col mb-4 text-sm'>
        {
          label && (
            <div className='flex justify-between'>
              <label
                htmlFor={inputId}
                className='block mb-2 text-sm font-medium text-gray-700'
              >
                {label}
              </label>
              <button
                type='button'
                onClick={handleToggleType}
                className='mr-2'
                aria-label={isShowPassword ? 'Password visible' : 'Password is not visible'}
              >
                {
                  isShowPassword
                    ? <EyeIcon className='size-4 text-black-600' />
                    : <EyeSlashIcon className='size-4 text-black-600' />
                }
              </button>
            </div>
          )
        }
        <input
          id={inputId}
          ref={ref}
          className="flex justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          placeholder={placeholder}
          type={ isShowPassword ? 'text' : 'password' }
          {...props}
        />
      </div>
    );
  }
);

PasswordField.displayName = "PasswordField"

export default PasswordField;
