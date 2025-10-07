import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { FuturisticLanding } from './components/FuturisticLanding';

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  if (!showDashboard) {
    return <FuturisticLanding onEnterDashboard={() => setShowDashboard(true)} />;
  }

  return (
    <div className="app-shell">
      <Dashboard />
    </div>
  );
}

export default App;
