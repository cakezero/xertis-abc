import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/Landing_Page/LandingPage.jsx';
import SignUp from './pages/SignUp.jsx';
import Login from './pages/Login.jsx';
import Overview from './pages/Dashboard/Overview.jsx';
import Certificate from './pages/Dashboard/Certificate.jsx';
import History from './pages/Dashboard/History.jsx';
import ManageCertificate from './pages/Dashboard/ManageCertificate.jsx';
import Settings from './pages/Dashboard/Settings.jsx';
import Mint from '../src/pages/Mint.jsx';
import { UserProvider } from './provider/UserProvider.jsx';
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/xertis/login" element={<Login />} />
          <Route path="/xertis/signup" element={<SignUp />} />
          <Route path="/xertis/dashboard/certificate" element={<Certificate />} />
          <Route path="/xertis/dashboard/overview" element={<Overview/>} />
          <Route path="/xertis/dashboard/history" element= {<History/>} />
          <Route path="/xertis/dashboard/manage-certificate" element= {<ManageCertificate />} />
          <Route path="/xertis/dashboard/settings" element= {<Settings/>} />
          <Route path="/claim/:certId" element={<Mint />} />
          <Route path="*" element={<Navigate to='/xertis/signup' replace />} />
        </Routes>
        <Toaster />
      </Router>
    </UserProvider>
  );
}

export default App;
