import React, { useState } from 'react'

export interface DropdownOption {
  value: string
  label: string
}

interface SelectDropdownFieldProps {
  placeholder?: string
  options: DropdownOption[]
  onChange: (optionValue: string) => void
  value: string
  label: string
  name: string
  errorText?: React.ReactNode
}

const SelectDropdownField: React.FC<SelectDropdownFieldProps> = ({
  placeholder = 'Select an option',
  options,
  onChange,
  value,
  label,
  name,
  errorText
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option: DropdownOption) => {
    onChange(option.value)
    setIsOpen(false)
  }

  return (
    <div className="relative mb-4">
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          className="flex justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={toggleDropdown}
        >
          {options.find((opt) => opt.value === value)?.label || placeholder}
          <svg
            className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {
          isOpen && (
            <div className="absolute z-10 w-full mt-2 overflow-hidden bg-white rounded-md shadow-lg">
              {options.map((option) => (
                <div
                  key={option.value}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-violet-100 cursor-pointer"
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </div>
              ))}
            </div>
        )}
      </div>

      {errorText}
    </div>
  )
}

export default SelectDropdownField
