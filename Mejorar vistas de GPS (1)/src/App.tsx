import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { RouteHistory } from './components/RouteHistory';
import { Geofencing } from './components/Geofencing';
import { Alerts } from './components/Alerts';
import { Users } from './components/Users';
import { Devices } from './components/Devices';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'routes':
        return <RouteHistory />;
      case 'geofencing':
        return <Geofencing />;
      case 'alerts':
        return <Alerts />;
      case 'users':
        return <Users />;
      case 'devices':
        return <Devices />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar activeView={activeView} onViewChange={setActiveView} />
      
      <div className="container mx-auto p-4 md:p-6 lg:p-8 flex-1">
        {renderView()}
      </div>

      <Footer />
    </div>
  );
}