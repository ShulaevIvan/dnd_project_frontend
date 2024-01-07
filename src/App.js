import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
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
import './components/CharacterStepsRace/CharacterStepsRace.css';
import './components/CharacterStepsClass/CharacterStepsClass.css';
import './components/CharacterStepsPreview/CharacterStepsPreview.css';
import './components/CharacterStepsBackground/CharacterStepsBackground.css';
import './components/CharacterStepsStats/CharacterStepsStats.css';
import './components/CharacterStepsAbilites/CharacterStepsAbilites.css';
import './components/CharacterStepsSkills/CharacterStepsSkills.css';
import './components/CharacterStepsTotal/CharacterStepsTotal.css';
import './components/UsersAccount/UsersAccount.css';



import Layout from './components/Layout/Layout';
import MainPage from './components/MainPage/MainPage';
import CharacterBuilder from './components/CharacterBuilder/CharacterBuilder';
import CharacterSteps from './components/CharacterSteps/CharacterSteps';
import DatabasePage from './components/DatabasePage/DatabasePage';
import ContactPage from './components/ContactPage/ContactPage';
import UsersAccount from './components/UsersAccount/UsersAccount';
import UsersProfile from './components/UsersAccount/UsersProfile';
import UsersCharacters from './components/UsersAccount/UsersCharacters';


function App() {
  
  return (
    <div className="App">
       <BrowserRouter>
          <Routes>
            <Route path='/' element = {<Layout />}>
              <Route path='/' element = {<MainPage />} />
              <Route path='/character-builder/' element = {<CharacterBuilder />} />
              <Route path='/database/' element = {<DatabasePage />} />
              <Route path='/contact/' element = {<ContactPage />} />
              <Route path='/character-builder/character-steps/:step' element={<CharacterSteps />} />
              <Route path='/profile/' element={<UsersProfile />}/>
              <Route path='/profile/characters/' element={<UsersCharacters />}/>
            </Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
