import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import MusicPage from './pages/Music';
import EventsPage from './pages/Events';
import BlogPage from './pages/Blog';
import TrainingPage from './pages/Training';
import SponsorshipPage from './pages/Sponsorship';
import ContactPage from './pages/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/training" element={<TrainingPage />} />
        <Route path="/sponsorship" element={<SponsorshipPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
