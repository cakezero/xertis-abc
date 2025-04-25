import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../src/pages/LandingPage';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
        {/* <Toaster /> */}
      </Router>
  );
}

export default App;