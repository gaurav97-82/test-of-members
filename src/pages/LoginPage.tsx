// Create a minimalist login/sign-up page with a green theme.
// Use supabase.auth.signInWithPassword for authentication.
// On success, redirect to '/discover'.

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import PrashikshanButton from '@/components/common/Button';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Implement sign-in and sign-up logic
  const handleAuth = async (isSignUp: boolean) => {
    setLoading(true);
    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (!error) {
      navigate('/discover');
    } else {
      alert(error.message);
    }
    setLoading(false);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-prashikshan-light">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-prashikshan-primary mb-6">Prashikshan Login</h1>
        {/* Form and Input Fields */}
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-green-300 rounded focus:ring-green-500 focus:border-green-500"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border border-green-300 rounded focus:ring-green-500 focus:border-green-500"
        />
        <div className="flex justify-between space-x-4">
          <PrashikshanButton onClick={() => handleAuth(false)} disabled={loading}>
            {loading ? 'Logging In...' : 'Login'}
          </PrashikshanButton>
          <PrashikshanButton onClick={() => handleAuth(true)} disabled={loading} variant="secondary">
            Sign Up
          </PrashikshanButton>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
