import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Bio from './components/bio-components/Bio';
import Projects from './components/projects-components/Projects';
import Resume from './components/resume-components/Resume';

const App = () => {
  return (
    <>
    <Header />
      <Routes>
        <Route path='/' exact element={<Bio />} />
        <Route path='/bio' exact element={<Bio />} />
        <Route path='/projects' exact element={<Projects />} />
        <Route path='/Resume' exact element={<Resume />} />
      </Routes>
    </>
  );
}

export default App;
