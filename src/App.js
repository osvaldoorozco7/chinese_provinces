import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Map from './components/Map/Map';
import Home from './components/Home/Home';
import Settings from './components/Settings/Settings';

function App() {
  return (

    <Router>
      <div className="App">
        <>

        <div className='app-wrapper'>

          <main className='app-content'>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/map" element={<Map/>} />
              <Route path="/settings" element={<Settings/>} />
            </Routes>
          </main>
          
        </div>
        </>
      </div>
    </Router>
  );
}

export default App;