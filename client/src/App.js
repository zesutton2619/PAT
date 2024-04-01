import './style/index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatDash from './pages/PatDashboard.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PatDash />} />
      </Routes>
  </Router>
  );
}

export default App;

