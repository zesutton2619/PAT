import './style/index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dash from './pages/PatDashboard.jsx';
import Contact from './pages/ContactPage.jsx'
import EagleHacks from './pages/EagleHacks.jsx'


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dash />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/eaglehacks" element={<EagleHacks />} />
            </Routes>
        </Router>
    );
}

export default App;
