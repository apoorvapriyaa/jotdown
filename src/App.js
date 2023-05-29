import './App.css';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [alert, setAlert] = useState(null)
  const [color, setColor] = useState("#e3fdfd")

  const showAlert = (message, color) => {
    setAlert({
      msg: message
    })
    setColor({
      clr: color
    })
    setTimeout(() => {
      setAlert(null)
      setColor("")
    }, 2000)
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} color={color} />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home showAlert={showAlert} />} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={<Login showAlert={showAlert} />} />
              <Route path='/signup' element={<Signup showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
