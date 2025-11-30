import React, { useEffect } from 'react';
import { supabase } from './lib/supabase';

function App() {
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const user = session.user;
        const payload = {
          user_id: user.id,
          email: user.email || null,
          provider: session.provider || null,
          metadata: { user_metadata: user.user_metadata || null }
        };

        const { error } = await supabase.from('login_events').insert(payload);
        if (error) {
          console.error('Failed to record login event:', error);
        }
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe?.();
    };
  }, []);

  return (
    <div>
      <h1>App</h1>
    </div>
  );
}

export default App;