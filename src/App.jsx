import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import Nav from './components/Nav';
import Contact from './pages/Contact';
import About from './pages/About';
import PageNotFound from './pages/PageNotFound';
import Redirects from './components/Redirects';
import DndCharacterSheetForm from './components/DndcharacterSheetForm';
import CharacterList from './components/CharacterList';
import CharacterDetails from './components/CharacterDetails';
import AreYouSure from './pages/AreYouSure';


const App = () => {

  // State(s)
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Function to handle page transition
  const handleTransition = () => {
    setIsTransitioning(true);

    // Wait for the transition to complete before updating state
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <>
      <Nav handler={handleTransition} />
      <div className="portfolio" id={isTransitioning ? "fade-out" : "fade-in"} >
        <Routes>
          <Route path='/' exact element={<About />} />
          <Route path='/contact' exact element={<Contact />} />
          <Route path='/charactersheetform' exact element={<DndCharacterSheetForm />} />
          <Route path="/character/:id" exact element={<CharacterDetails/>} />
          <Route path="/character/are-you-sure" exact element={<AreYouSure/>} />
          <Route path='/characterlist' exact element={<CharacterList />
          } />
          <Route path='/snoof' exact element={<PageNotFound />} />
          <Route path='*' element={<Redirects />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
