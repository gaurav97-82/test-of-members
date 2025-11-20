// Create the main dashboard/discover page. 
// Must be wrapped in AuthGuard.
// Display discovery cards using the green palette.

import AuthGuard from '@/components/AuthGuard';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import PrashikshanButton from '@/components/common/Button';

const DiscoverPage = () => {
  const navigate = useNavigate();
  
  const discoverItems = [
    { title: "Learning Paths", desc: "Structured career development tracks.", icon: "📚" },
    { title: "Internship Discovery", desc: "Find opportunities with industry partners.", icon: "💼" },
    { title: "Peer Collaboration", desc: "Join study groups and technical forums.", icon: "🤝" },
    { title: "Career Development", desc: "Access workshops and resume tools.", icon: "💡" },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 p-8">
        <header className="flex justify-between items-center pb-6 border-b border-green-200">
          <h1 className="text-4xl font-extrabold text-prashikshan-primary">Prashikshan</h1>
          <PrashikshanButton onClick={handleLogout}>Logout</PrashikshanButton>
        </header>

        <h2 className="text-3xl font-semibold mt-8 mb-6 text-gray-700">Discover Your Path</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {discoverItems.map((item) => (
            <div 
              key={item.title} 
              className="bg-prashikshan-light p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border-l-4 border-prashikshan-primary"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-xl font-bold text-green-800 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </AuthGuard>
  );
};

export default DiscoverPage;
