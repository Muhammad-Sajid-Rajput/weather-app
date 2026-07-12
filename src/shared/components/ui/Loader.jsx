const Loader = ({ size = 'md' }) => {
  const sizes = { sm: 'w-6 h-6', md: 'w-10 h-10', lg: 'w-14 h-14' }
  return (
    <div
      className={`${sizes[size]} border-2 border-primary border-t-transparent rounded-full animate-spin`}
      role="status"
      aria-label="Loading"
    />
  )
}

export default Loader
