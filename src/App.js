import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './components/Header/Header.css';
import './components/MainPage/MainPage.css';
import './components/LoginForm/LoginForm.css';
import './components/RegisterForm/RegisterForm.css';
import './components/SearchPanel/SearchPanel.css';
import './components/Footer/Footer.css';
import './components/Manuals/Manuals.css';
import './components/Instruments/Instruments.css';
import './components/CharacterBuilder/CharacterBuilder.css';
import './components/CharacterStepsInfo/CharacterStepsInfo.css';



import Layout from './components/Layout/Layout';
import MainPage from './components/MainPage/MainPage';
import CharacterBuilder from './components/CharacterBuilder/CharacterBuilder';
import CharacterSteps from './components/CharacterSteps/CharacterSteps';


function App() {
  return (
    <div className="App">
       <BrowserRouter>
          <Routes>
            <Route path='/' element = {<Layout />}>
              <Route path='/' element = {<MainPage />} />
              <Route path='/character-builder/' element = {<CharacterBuilder />} />
              <Route path='/info/' element = {<CharacterBuilder />} />
              <Route path='/contact/' element = {<CharacterBuilder />} />
              <Route path='/character-builder/character-steps/' element={<CharacterSteps />} />
            </Route>
            
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
