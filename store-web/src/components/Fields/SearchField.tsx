import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { forwardRef } from 'react'

interface SearchFieldProps extends React.ComponentPropsWithRef<'input'> {
  className?: string,
}

const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    {
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className='flex gap-3 w-full bg-gray-50 px-3 py-3 border border-color-gray-300 rounded-md'>
        <MagnifyingGlassIcon className='size-6 text-gray-300' />

        <input
          ref={ref}
          className='w-full bg-gray-50 outline-none'
          type="search"
          {...props}
        />
      </div>
    );
  }
);

SearchField.displayName = "InputField"

export default SearchField;
