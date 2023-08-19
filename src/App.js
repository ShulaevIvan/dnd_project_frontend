import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './components/Header/Header.css';
import './components/Body/Body.css';
import './components/LoginForm/LoginForm.css';
import './components/RegisterForm/RegisterForm.css';
import './components/SearchPanel/SearchPanel.css';
import './components/Footer/Footer.css';
import './components/Manuals/Manuals.css';
import './components/Instruments/Instruments.css';

import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Header></Header>
        <Body></Body>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
