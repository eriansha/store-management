import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

type ButtonProps = {
  className?: string,
  isLoading?: boolean,
  disabled?: boolean,
  pill?: boolean,
} & React.ComponentPropsWithRef<'button'>;


const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      pill,
      ...props
    },
    ref
  ) => {
    const disabled = isLoading || buttonDisabled;
    const borderRadius = pill ? "rounded-full" : 'rounded-md'
    const ariaLabel = typeof children !== "string" ? "button label" : children

    return (
      <button
        ref={ref}
        type='button'
        disabled={disabled}
        className={cn(
          `w-full py-2 bg-green-600 text-white ${borderRadius} ${className}`,
          [
            disabled && [
              'bg-gray-300'
            ]
          ]
        )}
        aria-label={ariaLabel}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button"

export default Button;
