import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './components/Header/Header.css';
import './components/Body/Body.css';
import './components/LoginForm/LoginForm.css';
import './components/RegisterForm/RegisterForm.css';
import Header from './components/Header/Header';
import Body from './components/Body/Body';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Header></Header>
        <Body></Body>
      </BrowserRouter>
    </div>
  );
}

export default App;
