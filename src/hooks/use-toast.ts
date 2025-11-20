// Example of a common error if the definition is incomplete:
// (assuming your context is defined elsewhere)

export function useToast() {
  // ❌ If you are missing the correct import or context hook call here, 
  //    it will fail when any component tries to use it.
  const context = React.useContext(ToastContext); 
  
  if (!context) {
    // This check is crucial if you are deploying!
    throw new Error('useToast must be used within a <ToastProvider />'); 
  }
  return context;
}

// And the toast function (often needs the useToast hook or a global dispatch)
export const toast = ({ /* ... options */ }) => {
  // ❌ If you are trying to call a function or module that hasn't been initialized 
  //    or is imported incorrectly, it will cause the crash.
  // ...
}
