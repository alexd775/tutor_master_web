import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProviders } from './providers/AppProviders';
import MainLayout from './components/common/Layout/MainLayout';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import ExperimentLogin from './pages/ExperimentLogin';
import Dashboard from './pages/Dashboard';
import TopicsList from './pages/TopicsList';
import SessionView from './pages/SessionView';
import Sessions from './pages/Sessions';
import Management from './pages/Management';

function App() {
  return (
    <AppProviders>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/experiment" element={<ExperimentLogin />} />
          <Route element={<PrivateRoute element={<MainLayout />} />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/topics" element={<TopicsList />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/session/:sessionId" element={<SessionView />} />
            <Route path="/management" element={<Management />} />
          </Route>
        </Routes>
      </Router>
    </AppProviders>
  );
}

export default App