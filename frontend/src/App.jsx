import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../src/pages/LandingPage';
import SignUp from './pages/SignUp.jsx';
import Login from './pages/Login.jsx';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/xertis/login" element={<Login />} />
          <Route path="/xertis/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to='/xertis/signup' replace />} />
        </Routes>
        {/* <Toaster /> */}
      </Router>
  );
}

export default App;