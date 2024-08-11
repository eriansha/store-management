import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

type ButtonProps = {
  className?: string,
  isLoading?: boolean,
  disabled?: boolean,
  pill?: boolean,
} & React.ComponentPropsWithRef<'button'>


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
    const disabled = isLoading || buttonDisabled
    const ariaLabel = typeof children !== "string" ? "button label" : children

    return (
      <button
        ref={ref}
        type='button'
        disabled={disabled}
        className={cn(
          `w-full py-2 bg-violet-600 text-white rounded-md ${className}`,
          [
            disabled && [
              'bg-gray-300'
            ]
          ],
          [
            pill && [
              'rounded-full'
            ]
          ]
        )}
        aria-label={ariaLabel}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export default Button
