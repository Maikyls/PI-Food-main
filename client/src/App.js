import './App.css';
// import { BrowserRouter } from 'react-router-dom'
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <div className="App">
      <h1>Henry Food</h1>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="about" element={<About />} /> */}
      </Routes>
    </div>
  );
}

export default App;
