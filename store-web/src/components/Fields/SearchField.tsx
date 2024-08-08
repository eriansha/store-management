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
      <div className='w-full bg-gray-50 px-3 py-3 border border-color-gray-300 rounded-md'>
      {/* TODO: icon search */}

      <input
        ref={ref}
        className='w-full bg-gray-50'
        type="search"
        {...props}
      />
    </div>
    );
  }
);

SearchField.displayName = "InputField"

export default SearchField;
