import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { ThemeSelection } from './pages/ThemeSelection';
import { GameBoard } from './pages/GameBoard';
import { UnlockPremium } from './pages/UnlockPremium';
import { Success } from './pages/Success';
import { Cancel } from './pages/Cancel';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/themes" element={<ThemeSelection />} />
          <Route path="/game/:themeId" element={<GameBoard />} />
          <Route path="/unlock" element={<UnlockPremium />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
