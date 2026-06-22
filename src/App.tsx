import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './lib/context';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/dashboard/Dashboard';
import DataCollection from './pages/dashboard/DataCollection';
import AIInsights from './pages/dashboard/AIInsights';
import DigitalTwin from './pages/dashboard/DigitalTwin';
import Simulation from './pages/dashboard/Simulation';
import Reports from './pages/dashboard/Reports';
import Alerts from './pages/dashboard/Alerts';
import Gamification from './pages/dashboard/Gamification';
import AIAssistant from './pages/dashboard/AIAssistant';
import Settings from './pages/dashboard/Settings';

function AppRoutes() {
  const { isLoggedIn } = useApp();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />}
      >
        <Route index element={<Dashboard />} />
        <Route path="data-collection" element={<DataCollection />} />
        <Route path="ai-insights" element={<AIInsights />} />
        <Route path="digital-twin" element={<DigitalTwin />} />
        <Route path="simulation" element={<Simulation />} />
        <Route path="reports" element={<Reports />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="gamification" element={<Gamification />} />
        <Route path="ai-assistant" element={<AIAssistant />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
