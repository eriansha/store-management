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
            <label
              htmlFor={inputId}
              className='font-medium'
            >
              {label}
            </label>
          )
        }
        <div className='flex border border-grey-300 rounded-md'>
          <input
            id={inputId}
            ref={ref}
            className='w-full py-4 px-2 outline-none'
            placeholder={placeholder}
            type={ isShowPassword ? 'text' : 'password' }
            {...props}
          />

          <button
            onClick={handleToggleType}
            className='mr-2'
            aria-label={isShowPassword ? 'Password visible' : 'Password is not visible'}
          >
            {
              isShowPassword
                ? <EyeIcon className='size-6 text-black-600' />
                : <EyeSlashIcon className='size-6 text-black-600' />
            }
          </button>
        </div>
      </div>
    );
  }
);

PasswordField.displayName = "PasswordField"

export default PasswordField;
