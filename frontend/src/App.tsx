import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { GamePage } from './pages/GamePage';
import ChessBoard1 from './test/Chessboard1';

function App() {
  return (
    <div className="h-screen bg-gray-950">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/testDnd" element={<ChessBoard1 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
