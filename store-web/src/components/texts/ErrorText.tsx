const ErrorText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className='text-red-500 text-light text-xs mt-2'>
    {children}
  </span>
)

export default ErrorText
