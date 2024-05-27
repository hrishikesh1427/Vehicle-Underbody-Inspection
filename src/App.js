
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login.jsx';
import Start from './Start.jsx';
import FinalPage from './FinalPage.jsx';
import Settings from './Settings';
import AddCamera from './addCamera'; 
import EditCamera from './editCamera';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Start" element={<Start />} />
        <Route path="/FinalPage" element={<FinalPage />} />
        <Route path="/Settings" element={<Settings />} />
       
        <Route path="/addCamera" element={<AddCamera />} />
        <Route path="/editCamera" element={<EditCamera />} />
      </Routes>
    </Router>
  );
}

export default App;
