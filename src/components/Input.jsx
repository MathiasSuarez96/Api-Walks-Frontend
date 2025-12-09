export default function Input({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  autoComplete,
  required = false,
  error,
  ...props
}) {
  return (
    <div className="space-y-2">
      
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required={required}
        className={`
          w-full px-4 py-3 
          rounded-lg border-2 
          bg-white
          text-gray-900
          placeholder:text-gray-400
          focus:outline-none focus:ring-2 focus:ring-offset-2
          transition-all duration-200
          ${error 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
          }
          disabled:bg-gray-100 disabled:cursor-not-allowed
        `}
        {...props}
      />

      
      {error && (
        <p className="text-sm text-red-600 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}